import { FirebaseSurfaceTemplate, SurfaceTemplate } from './types';

export const transformSurfaceTemplate = {
  fromFirebase(surface: FirebaseSurfaceTemplate): SurfaceTemplate {
    return {
      id: surface.id,
      name: surface.name,
      descriptors: surface.descriptors || [],
    };
  },
  toFirebase(surface: SurfaceTemplate): FirebaseSurfaceTemplate {
    return {
      id: surface.id,
      name: surface.name,
      descriptors: surface.descriptors || [],
    };
  },
};
