import { useDispatch } from 'react-redux';
import * as firebase from './firebase';
import { actions } from './reducer';

export default function useOrgs() {
  const dispatch = useDispatch();

  async function fetchOrgs(orgIds: string[]) {
    return firebase.fetchOrgs(orgIds).then((orgs) => {
      dispatch(actions.setOrgs(orgs));
    });
  }

  return {
    fetchOrgs,
  };
}
