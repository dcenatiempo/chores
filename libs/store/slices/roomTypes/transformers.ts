import { FirebaseRoomType, RoomType } from './types';

export function transformRoomTypesFromFirebase(
  roomTypes: FirebaseRoomType[] = []
): RoomType[] {
  return roomTypes.map((rt) => ({
    id: rt.id,
    name: rt.name,
    description: rt?.description,
  }));
}
