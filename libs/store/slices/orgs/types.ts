import { Action } from '../actions/types';
import { RoomType } from '../roomTypes/types';
import { Surface } from '../surfaces/types';

export interface Person {
  lastName: string;
  birthday: number;
  firstName: string;
}

export interface Room {
  surfaceIds: string[];
  level: string;
  name: string;
  type: string;
  id: string;
}

export interface Chore {
  name: string;
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
  customSurfaces: Surface[];
  customActions: Action[];
  customRoomTypes: RoomType[];
}

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
