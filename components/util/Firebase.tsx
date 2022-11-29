import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../libs/firebase';
import { scheduledChoresStore, orgsStore, userStore } from '../../libs/store';
import useActions from '../../libs/store/models/actions/useActions';
import useChoreHistory from '../../libs/store/models/choreHistory/useChoreHistory';
import useOrgs from '../../libs/store/models/orgs/useOrgs';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { fetchOrgsScheduledChores } from '../../libs/store/models/scheduledChores/firebase';
import { useSurfaces } from '../../libs/store/models/surfaces';
import useUser from '../../libs/store/models/user/useUser';
import store from '../../libs/store/store';

export default function Firebase() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { fetchSurfaceTemplates } = useSurfaces();
  const { fetchRoomTypes } = useRoomTypes();
  const { fetchActions } = useActions();
  const { fetchUser } = useUser();
  const { fetchOrgs } = useOrgs();
  const { fetchOrgsChoreHistory } = useChoreHistory();

  useEffect(() => {
    function emptyStore() {
      dispatch(userStore.actions.clearUser());
      dispatch(orgsStore.actions.clearOrgs());
      dispatch(scheduledChoresStore.actions.clearScheduledChores());
    }

    function hydrateStore(userId: string) {
      // Signed in
      fetchUser(userId)
        .then((user) => {
          const orgIds = user?.organizations?.map((o) => o.id) || [];
          return Promise.all([
            fetchOrgsScheduledChores(orgIds),
            fetchOrgs(orgIds),
            fetchOrgsChoreHistory(orgIds),
          ]);
        })
        .then(() => {
          dispatch(orgsStore.asyncActions.listenForOrgChanges());
          dispatch(
            scheduledChoresStore.asyncActions.listenForScheduledChoreChanges()
          );
        });
      fetchRoomTypes();
      fetchSurfaceTemplates();
      fetchActions();
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        emptyStore();
      } else {
        hydrateStore(user.uid);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return null;
}
