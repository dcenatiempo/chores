import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface FirebaseTimestamp extends Timestamp {}

export interface FirebaseReference extends DocumentReference {}

export enum Collection {
  ORGS = 'organization', // todo: change to "orgs"
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
}
