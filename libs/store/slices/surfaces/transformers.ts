import { FirebaseSurface, Surface } from './types';

export function transformSurfacesFromFirebase(
  surfaces: FirebaseSurface[] = []
): Surface[] {
  return surfaces.map((s) => ({
    id: s.id,
    name: s.name,
    descriptor: s?.descriptor,
  }));
}
