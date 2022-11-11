export interface BaseSlice {
  loading: boolean;
  error: string | null;
}

export interface Map<T> {
  [id: string]: T;
}

export type Environment = 'indoors' | 'outdoors';
