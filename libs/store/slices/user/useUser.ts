import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformUser } from './transformers';

export default function useUser() {
  const dispatch = useDispatch();

  const user = useSelector(selectors.user);

  async function fetchUser(userId: string) {
    return firebase.fetchUser(userId).then((user) => {
      const cleanUser = transformUser.fromFirebase(user);
      dispatch(actions.setUser(cleanUser));
      return cleanUser;
    });
  }

  return {
    user,
    fetchUser,
  };
}
