export interface SurfacesState extends BaseSlice {
  data: Surface[];
}

export interface SurfaceTemplate {
  id: string;
  name: string;
  descriptors: string[];
}

export interface Surface {
  id: string;
  name: string;
  descriptor?: string;
}

export interface FirebaseSurface {
  // id is camelCaseName
  id: string;
  name: string;
  descriptor?: string;
}
