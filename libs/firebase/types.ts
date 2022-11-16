import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface FBTimestamp extends Timestamp {}

export interface FBReference extends DocumentReference {}

export enum Collection {
  ORGS = 'orgs',
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
  ORG_SCHEDULED_CHORES = 'orgChoreFeed', // TODO: change to 'orgsScheduledChores'
  ORG_CHORES_IN_FLIGHT = 'orgsChoresInFlight',
  ORG_CHORE_HISTORY = 'orgsChoreHistory',
}
