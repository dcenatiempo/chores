import { Collection, fetchDocs } from '../../../firebase';
import { FirebaseAction } from './types';

export async function fetchActions() {
  return fetchDocs<FirebaseAction>(Collection.ACTIONS);
}
