import { FirebaseReference, FirebaseTimestamp } from '../../firebase';

export function timestampTransformer(firebaseTimestamp: FirebaseTimestamp) {
  return firebaseTimestamp?.seconds || 0;
}

export function referenceTransformer(firebaseReference: FirebaseReference[]) {
  return firebaseReference.map((fr) => fr.id);
}
