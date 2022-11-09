import { BaseSlice } from '../types';

export interface SurfacesState extends BaseSlice {
  data: SurfaceTemplate[];
}

export interface FirebaseSurfaceTemplate {
  id: string;
  name: string;
  descriptors: string[];
}

export interface SurfaceTemplate {
  id: string;
  name: string;
  descriptors: string[];
}

export interface Surface {
  id: string;
  surfaceId: string;
  descriptor: string;
}

export interface FirebaseSurface {
  id: string;
  surfaceRef: string;
  descriptor?: string;
}
