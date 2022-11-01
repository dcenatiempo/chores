import { Timestamp } from 'firebase/firestore';
import { FirebaseReference, FirebaseTimestamp } from '../../firebase';

export const transformTimestamp = {
  fromFirebase(firebaseTimestamp: FirebaseTimestamp) {
    return firebaseTimestamp?.seconds || 0;
  },
  toFirebase(timestamp: number): FirebaseTimestamp {
    return Timestamp.fromMillis(timestamp);
  },
};

export const transformReference = {
  fromFirebase(firebaseReference: FirebaseReference[]) {
    return firebaseReference.map((fr) => fr.id);
  },
  toFirebase() {},
};
