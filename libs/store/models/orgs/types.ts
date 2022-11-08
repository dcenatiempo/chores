import { UnixTimestamp } from '../../../dateTime';
import { FirebaseReference, FirebaseTimestamp } from '../../../firebase';
import { Action, FirebaseAction } from '../actions/types';
import { FirebaseRoomType, RoomType } from '../roomTypes/types';
import {
  FirebaseSurfaceTemplate,
  Surface,
  SurfaceTemplate,
} from '../surfaces/types';
import { BaseSlice } from '../types';

export interface Person {
  id: string;
  lastName?: string;
  birthday?: UnixTimestamp;
  firstName: string;
}

export interface Room {
  surfaces: Surface[];
  level: string;
  name: string;
  type: string;
  id: string;
}

export interface Chore {
  name: string;
  id: string;
}

export interface Task {
  id: string;
  actionId: string;
  roomId: string;
  surfaceId: string;
}

export interface Org {
  id: string;
  name: string;
  levels: Level[];
  rooms: Room[];
  people: Person[];
  chores: Chore[];
  tasks: Task[];
  customSurfaces: SurfaceTemplate[];
  customActions: Action[];
  customRoomTypes: RoomType[];
  lastId: string; // hexedecimal string starting at 1000, last id that was assigned to a resource in the org, should be incremented and set when new resource id is needed
  // settings?: Settings;
}

// export interface Settings {
//   timeZone: string;
// }

export type Level = string;

export interface OrgMap<T> {
  [key: string]: {
    orgId: string;
    data: T;
  };
}

export interface OrgsMap extends OrgMap<Org> {}

export interface OrgsState extends BaseSlice {
  orgsMap: OrgsMap;
  currentOrgId: string | undefined;
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
  lastId: string; // hexedecimal string starting at 1000, last id that was assigned to a resource in the org, should be incremented and set when new resource id is needed
}

export type FirebaseLevel = string;

export interface FirebaseRoom {
  id: string;
  level: string;
  name: string;
  surfaces: FirebaseSurface[];
  typeRef: FirebaseReference;
}

export interface FirebaseSurface {
  id: string;
  surfaceRef: FirebaseReference;
  name: string;
  descriptor: string;
}

export interface FirebasePerson {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: FirebaseTimestamp;
}

export interface FirebaseChore {
  id: string;
  name: string;
  // ?
}

export interface FirebaseTask {
  id: string;
  // ?
}

export interface FirebaseCustomSurface extends FirebaseSurfaceTemplate {}

export interface FirebaseCustomAction extends FirebaseAction {}

export interface FirebaseCustomRoomType extends FirebaseRoomType {}
