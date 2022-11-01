import { Timestamp } from 'firebase/firestore';
import { FirebaseReference, FirebaseTimestamp } from '../../firebase';

export const transformTimestamp = {
  fromFirebase(firebaseTimestamp: FirebaseTimestamp) {
    return firebaseTimestamp?.toMillis();
  },
  toFirebase(ms: number): FirebaseTimestamp {
    return Timestamp.fromMillis(ms);
  },
};

export const transformReference = {
  fromFirebase(firebaseReference: FirebaseReference[]) {
    return firebaseReference.map((fr) => fr.id);
  },
  toFirebase() {},
};
