import { BaseSlice } from '../types';

export interface SurfacesState extends BaseSlice {
  data: FBSurfaceTemplate[];
}

export interface FBSurfaceTemplate {
  id: string;
  name: string;
  attached: boolean | null; // attached to a room: true = must be attached to a room, false = never attached to a room, null = may be attached or not
}

export interface SurfaceTemplate {
  id: string;
  name: string;
  attached: boolean | null; // attached to a room: true = must be attached to a room, false = never attached to a room, null = may be attached or not
}

// export interface Surface {
//   id: string;
//   name?: string; // custom name - otherwise surface name is the effective name
//   surfaceTemplate: SurfaceTemplate;
// }

// export interface FBSurface {
//   id: string;
//   name?: string; // custom name - otherwise surface name is the effective name
//   surfaceTemplateId: string;
// }
