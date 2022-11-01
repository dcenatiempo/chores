import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformOrgs } from './transformers';

export default function useOrgs() {
  const dispatch = useDispatch();

  const orgs = useSelector(selectors.orgs);

  async function fetchOrgs(orgIds: string[]) {
    return firebase.fetchOrgs(orgIds).then((orgs) => {
      const cleanOrgs = transformOrgs.fromFirebase(orgs);
      dispatch(actions.setOrgs(cleanOrgs));
      return cleanOrgs;
    });
  }

  return {
    orgs,
    fetchOrgs,
  };
}