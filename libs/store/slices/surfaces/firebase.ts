import { Collection, fetchDocs } from '../../../firebase';
import { FirebaseSurface } from './types';

export async function fetchSurfaces() {
  return fetchDocs<FirebaseSurface>(Collection.SURFACES);
}
