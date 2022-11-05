import { Collection, fetchDocs } from '../../../firebase';
import { FirebaseRoomType } from './types';

export async function fetchRoomTypes() {
  return fetchDocs<FirebaseRoomType>(Collection.ROOM_TYPES);
}
