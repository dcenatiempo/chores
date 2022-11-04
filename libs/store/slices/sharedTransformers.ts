import { doc, Timestamp } from 'firebase/firestore';
import { UnixTimestamp } from '../../dateTime';
import {
  Collection,
  db,
  FirebaseReference,
  FirebaseTimestamp,
} from '../../firebase';

export const transformTimestamp = {
  fromFirebase(firebaseTimestamp: FirebaseTimestamp): UnixTimestamp {
    return firebaseTimestamp.seconds;
  },
  toFirebase(timestamp: UnixTimestamp): FirebaseTimestamp {
    return Timestamp.fromMillis(timestamp * 1000);
  },
};

export const transformReference = {
  fromFirebase(firebaseReference: FirebaseReference[]) {
    return firebaseReference.map((fr) => fr.id);
  },
  toFirebase(collection: Collection, refId: string) {
    return doc(db, collection, refId).path;
  },
};
