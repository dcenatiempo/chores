import { Collection, fetchDocs } from '../../../firebase';
import { FirebaseSurfaceTemplate } from './types';

export async function fetchSurfaces() {
  return fetchDocs<FirebaseSurfaceTemplate>(Collection.SURFACES);
}
