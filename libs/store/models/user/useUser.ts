import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';

export default function useUser() {
  const dispatch = useDispatch();

  const user = useSelector(selectors.user);

  const isAuthenticated = useSelector(selectors.isAuthenticated);

  async function fetchUser(userId: string) {
    return firebase.fetchUser(userId).then((user) => {
      if (!user) return;
      dispatch(actions.setUser(user));
      return user;
    });
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
  };
}
