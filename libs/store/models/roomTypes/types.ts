import { BaseSlice } from '../types';

export interface RoomTypesState extends BaseSlice {
  data: FBRoomType[];
}

export interface FBRoomType {
  id: string;
  name: string;
  description?: string;
}

export interface RoomType {
  id: string;
  name: string;
  description?: string;
}
