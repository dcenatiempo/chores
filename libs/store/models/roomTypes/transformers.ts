import { Map } from '../types';
import { FBRoomType, RoomType } from './types';

export const transformRoomType = {
  fromFB(type: FBRoomType): RoomType {
    return {
      id: type.id,
      name: type.name,
      description: type.description,
      defaultSurfaces: type.defaultSurfaces || [],
    };
  },
  toFB(type: RoomType): FBRoomType {
    return {
      id: type.id,
      description: type.description,
      name: type.name,
      defaultSurfaces: type.defaultSurfaces,
    };
  },
  hydrate(roomTypeId: string, roomTypes: Map<RoomType>) {
    return roomTypes[roomTypeId];
  },
  dehydrate(roomType: RoomType): string {
    return roomType.id;
  },
};
