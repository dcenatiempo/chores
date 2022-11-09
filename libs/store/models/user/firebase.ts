import { Collection, fetchDoc } from '../../../firebase';
import { FBUser } from './types';

export async function fetchUser(userId: string): Promise<FBUser | null> {
  return fetchDoc<FBUser>(Collection.USER, userId);
}
