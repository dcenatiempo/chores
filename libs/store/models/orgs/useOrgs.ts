import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {
  Collection,
  db,
  OrgCollection,
  updateEntityFromCollection,
} from '../../../firebase';
import { arrayToMap } from '../sharedTransformers';
import * as firebase from './firebase';
import { actions } from './reducer';
import { transformOrg } from './transformers';

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
