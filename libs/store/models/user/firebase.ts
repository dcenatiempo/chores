import { Collection, db, fetchDoc, fetchDocs } from '../../../firebase';
import { FirebaseUser } from './types';

export async function fetchUser(userId: string): Promise<FirebaseUser | null> {
  return fetchDoc<FirebaseUser>(Collection.USER, userId);
}
