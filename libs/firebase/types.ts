import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface FBTimestamp extends Timestamp {}

export interface FBReference extends DocumentReference {}

export enum OrgCollection {
  ORGS = 'orgs',
  ORG_SCHEDULED_CHORES = 'orgScheduledChores',
}

export enum Collection {
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
  CHORE_HISTORY = 'choreHistory',
}
