import { BaseSlice } from '../types';

export interface SurfacesState extends BaseSlice {
  data: FBSurfaceTemplate[];
}

export interface FBSurfaceTemplate {
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
  name?: string; // custom name - otherwise surface name is the effective name
  descriptor?: string;
  surfaceTemplate: SurfaceTemplate;
}

export interface FBSurface {
  id: string;
  name?: string; // custom name - otherwise surface name is the effective name
  descriptor?: string;
  surfaceTemplateId: string;
}
