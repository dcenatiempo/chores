import { UnixTimestamp } from '../../../dateTime';
import { FBTimestamp } from '../../../firebase';
import { Action, FBAction } from '../actions/types';
import { FBRoomType, RoomType } from '../roomTypes/types';
import {
  FBSurface,
  FBSurfaceTemplate,
  Surface,
  SurfaceTemplate,
} from '../surfaces/types';
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
  chores: Map<FBChore>;
  tasks: Map<FBTask>;
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
  chores: Map<Chore>;
  tasks: Map<Task>;
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
  surfaces: Map<FBSurface>;
  roomTypeId: string;
}

export interface Room {
  id: string;
  name: string;
  level: Level;
  surfaces: Map<Surface>;
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

export interface FBTask {
  id: string;
  actionId: string;
  levelId: string;
  roomId?: string;
  roomTypeId?: string;
  surfaceId?: string;
  surfaceTemplateId?: string;
}

export interface Task {
  id: string;
  action: Action;
  level?: Level;
  roomType?: RoomType;
  room?: Room;
  surface?: Surface;
  surfaceTemplate?: SurfaceTemplate;
}

export interface FBChore {
  id: string;
  name: string;
  taskIds: Map<string>;
  roomId?: string; // TODO: is this necessary? might have a room with generic roomType tasks
}

export interface Chore {
  id: string;
  name: string;
  tasks: Map<Task>;
  room?: Room; // TODO: is this necessary? might have a room with generic roomType tasks
}
