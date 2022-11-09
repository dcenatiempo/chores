import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface FBTimestamp extends Timestamp {}

export interface FBReference extends DocumentReference {}

export enum Collection {
  ORGS = 'orgs', // todo: change to "orgs"
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
}
