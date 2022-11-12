import { Map } from '../types';
import { FBSurfaceTemplate, SurfaceTemplate } from './types';

export const transformSurfaceTemplate = {
  fromFB(surface: FBSurfaceTemplate): SurfaceTemplate {
    return {
      id: surface.id,
      name: surface.name,
      attached: surface.attached,
    };
  },
  toFB(surface: SurfaceTemplate): FBSurfaceTemplate {
    return {
      id: surface.id,
      name: surface.name,
      attached: surface.attached,
    };
  },
  dehydrate(surface: SurfaceTemplate): string {
    return surface.id;
  },
  hydrate(surfaceTemplateId: string, surfaceTemplates: Map<SurfaceTemplate>) {
    return surfaceTemplates[surfaceTemplateId];
  },
};
