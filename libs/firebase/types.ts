import { DocumentReference, Timestamp } from 'firebase/firestore';
import { FirebaseSurface } from '../store/slices/surfaces/types';

export enum Collection {
  ORGS = 'organization', // todo: change to "orgs"
  SURFACES = 'surfaces',
  ROOM_TYPES = 'roomTypes',
  ACTIONS = 'actions',
  USER = 'users',
}

export interface FirebaseOrg {
  id: string;
  name: string;
  levels: FirebaseLevel[];
  rooms: FirebaseRoom[];
  people: FirebasePerson[];
  chores: FirebaseChore[];
  tasks: FirebaseTask[];
  customSurfaces?: FirebaseCustomSurface[];
  customActions?: FirebaseCustomAction[];
  customRoomTypes?: FirebaseCustomRoomType[];
}

export type FirebaseLevel = string;

export interface FirebaseRoom {
  id: string;
  level: string;
  name: string;
  surfaces: FirebaseRoomSurface[];
  typeRef: FirebaseReference;
}

export interface FirebaseRoomSurface extends FirebaseSurface {
  surfaceRef: FirebaseReference;
}

export interface FirebaseCustomSurface {
  // id is custom_camelCaseName
  id: string;
  name: string;
  descriptor?: string;
}

export interface FirebasePerson {
  firstName: string;
  lastName: string;
  birthday: FirebaseTimestamp;
}

export interface FirebaseTimestamp extends Timestamp {}
export interface FirebaseReference extends DocumentReference {}

export interface FirebaseChore {
  name: string;
  // ?
}

export interface FirebaseTask {
  // ?
}

export interface FirebaseCustomAction {
  // id is custom_camelCaseName
  id: string;
  name: string;
}

export interface FirebaseCustomRoomType {
  // id is custom_camelCaseName
  id: string;
  description: string;
  name: string;
}

export interface FirebaseReference {
  id: string;
  // ?
}
