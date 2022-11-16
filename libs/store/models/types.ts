export interface BaseSlice {
  loading: boolean;
  error: string | null;
}

export interface Map<T> {
  [id: string]: T;
}

export interface OrgMap<T> {
  [key: string]: {
    orgId: string;
    data: T;
  };
}

export type Environment = 'indoors' | 'outdoors';
