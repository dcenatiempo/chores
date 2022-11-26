import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface FBTimestamp extends Timestamp {}

export interface FBReference extends DocumentReference {}

export enum Collection {
  ORGS = 'orgs',
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
  ORG_SCHEDULED_CHORES = 'orgScheduledChores',
  CHORE_HISTORY = 'choreHistory',
}
