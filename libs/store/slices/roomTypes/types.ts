export interface RoomType {
  id: string;
  name: string;
  description: string;
}

export interface RoomTypesState extends BaseSlice {
  data: RoomType[];
}

export interface FirebaseRoomType {
  // id is camelCaseName
  id: string;
  description: string;
  name: string;
}
