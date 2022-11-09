import { Collection, fetchDocs } from '../../../firebase';
import { FBRoomType } from './types';

export async function fetchRoomTypes() {
  return fetchDocs<FBRoomType>(Collection.ROOM_TYPES);
}
