import { Collection, fetchDocs } from '../../../firebase';
import { FBSurfaceTemplate } from './types';

export async function fetchSurfaces() {
  return fetchDocs<FBSurfaceTemplate>(Collection.SURFACES);
}
