import { Collection, fetchDocs } from '../../../firebase';
import { FBAction } from './types';

export async function fetchActions() {
  return fetchDocs<FBAction>(Collection.ACTIONS);
}
