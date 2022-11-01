import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../libs/firebase';
import { organizationsStore, userStore } from '../../libs/store';
import useActions from '../../libs/store/slices/actions/useActions';
import useOrgs from '../../libs/store/slices/orgs/useOrgs';
import { useRoomTypes } from '../../libs/store/slices/roomTypes';
import { useSurfaces } from '../../libs/store/slices/surfaces';
import useUser from '../../libs/store/slices/user/useUser';
import store from '../../libs/store/store';

export default function Firebase() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { fetchSurfaces } = useSurfaces();
  const { fetchRoomTypes } = useRoomTypes();
  const { fetchActions } = useActions();
  const { fetchUser } = useUser();
  const { fetchOrgs } = useOrgs();

  useEffect(() => {
    function emptyStore() {
      dispatch(userStore.actions.clearUser());
      dispatch(organizationsStore.actions.clearOrgs());
    }

    function hydrateStore(userId: string) {
      // Signed in
      fetchUser(userId)
        .then((user) => {
          return fetchOrgs(user.organizationIds);
        })
        .then(() => {
          dispatch(organizationsStore.asyncActions.listenForOrgChanges());
        });
      fetchRoomTypes();
      fetchSurfaces();
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
  }, [dispatch]);

  return null;
}
