import { UnixTimestamp } from '../../../dateTime';
import { FBTimestamp } from '../../../firebase';
import { Action, FBAction } from '../actions/types';
import { FBRoomType, RoomType } from '../roomTypes/types';
import { FBSurfaceTemplate, SurfaceTemplate } from '../surfaces/types';
import { BaseSlice, Map, OrgMap } from '../types';

// export interface Settings {
//   timeZone: string;
// }

export interface OrgsMap extends OrgMap<FBOrg> {}

export interface OrgsState extends BaseSlice {
  orgsMap: OrgsMap;
  currentOrgId: string | undefined;
}

export interface FBOrg {
  id: string;
  name: string;
  levels: Map<FBLevel>;
  rooms: Map<FBRoom>;
  people: Map<FBPerson>;
  chores: Map<FBChoreTemplate>;
  tasks: Map<FBTaskTemplate>;
  customSurfaces?: Map<FBSurfaceTemplate>;
  customActions?: Map<FBAction>;
  customRoomTypes?: Map<FBRoomType>;
  lastId: string; // hexedecimal string starting at 1000, last id that was assigned to a resource in the org, should be incremented and set when new resource id is needed
}

export interface Org {
  id: string;
  name: string;
  levels: Map<Level>;
  rooms: Map<Room>;
  people: Map<Person>;
  chores: Map<ChoreTemplate>;
  tasks: Map<TaskTemplate>;
  customSurfaces?: Map<SurfaceTemplate>;
  customActions?: Map<Action>;
  customRoomTypes?: Map<RoomType>;
  lastId: string; // hexedecimal string starting at 1000, last id that was assigned to a resource in the org, should be incremented and set when new resource id is needed
}

export interface FBLevel {
  id: string;
  name: string;
}

export interface Level {
  id: string;
  name: string;
}

export interface FBRoom {
  id: string;
  name: string;
  levelId: string;
  surfaceIds: string[];
  roomTypeId: string;
}

export interface Room {
  id: string;
  name: string;
  level: Level;
  surfaces: Map<SurfaceTemplate>;
  roomType: RoomType;
}

export interface FBPerson {
  id: string;
  firstName: string;
  lastName?: string;
  birthday?: FBTimestamp;
}

export interface Person {
  id: string;
  firstName: string;
  lastName?: string;
  birthday?: UnixTimestamp;
}

export interface FBTaskTemplate {
  id: string;
  actionId: string;
  surfaceTemplateId: string;
}

export interface TaskTemplate {
  id: string;
  action: Action;
  surfaceTemplate: SurfaceTemplate;
}

export interface FBChoreTemplate {
  id: string;
  name: string;
  taskTemplateIds: Map<string>;
}

export interface ChoreTemplate {
  id: string;
  name: string;
  taskTemplates: Map<TaskTemplate>;
}
