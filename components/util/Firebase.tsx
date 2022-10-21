import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthUser } from '../../libs/authentication';
import {
  auth,
  getActions,
  getRoomTypes,
  getSurfaces,
  getUser,
  getUserOrgs,
} from '../../libs/firebase';
import {
  actionsStore,
  organizationsStore,
  roomTypesStore,
  surfacesStore,
  userStore,
} from '../../libs/store';
import { cleanOrgs } from '../../libs/store/slices/organizations/reducer';
import store from '../../libs/store/store';

export default function Firebase() {
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    function emptyStore() {
      dispatch(userStore.actions.clearUser());
      dispatch(organizationsStore.actions.clearOrganizations());
    }

    function hydrateStore(userId: string) {
      // Signed in
      getUser(userId)
        .then((user) => {
          dispatch(userStore.actions.setUser(user));
          return getUserOrgs(user);
        })
        .then((orgs) => {
          console.log(orgs);
          dispatch(
            organizationsStore.actions.setOrganizations(cleanOrgs(orgs))
          );

          dispatch(organizationsStore.asyncActions.listenForOrgChanges());
        });
      getRoomTypes().then((types) => {
        dispatch(roomTypesStore.actions.setRoomTypes(types));
      });
      getSurfaces().then((surfaces) => {
        console.log(surfaces);
        dispatch(surfacesStore.actions.setSurfaces(surfaces));
      });
      getActions().then((actions) => {
        console.log(actions);
        dispatch(actionsStore.actions.setActions(actions));
      });
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
