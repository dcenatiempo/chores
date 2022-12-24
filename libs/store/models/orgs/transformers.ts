import { doc } from '@firebase/firestore';
import { db } from '../../../firebase';
import { Collection, FBReference } from '../../../firebase/types';
import { transformAction } from '../actions/transformers';
import { transformRoomType } from '../roomTypes/transformers';
import { RoomType } from '../roomTypes/types';
import { Task } from '../scheduledChores/types';
import {
  arrayToMap,
  mapToArray,
  transformMap,
  transformTimestamp,
} from '../sharedTransformers';
import { transformSurfaceTemplate } from '../surfaces/transformers';
import { SurfaceTemplate } from '../surfaces/types';
import { Map, OrgMap } from '../types';
import {
  ChoreTemplate,
  FBChoreTemplate,
  FBLevel,
  FBOrg,
  FBPerson,
  FBRoom,
  FBTaskTemplate,
  Level,
  Org,
  Person,
  Room,
  TaskTemplate,
} from './types';

export const transformOrgs = {
  fromFB(
    orgs: FBOrg[],
    roomTypes: Map<RoomType>,
    surfaceTemplates: Map<SurfaceTemplate>
  ): Org[] {
    return orgs.map((org) =>
      transformOrg.fromFB(org, roomTypes, surfaceTemplates)
    );
  },
  toFB(orgs: Org[]): FBOrg[] {
    return orgs.map((org) => transformOrg.toFB(org));
  },
};

export const transformOrg = {
  toFB(org: Org): FBOrg {
    const { id, name } = org;
    return {
      id,
      name,
      levels: transformMap(org.levels, transformLevel.toFB),
      rooms: transformMap(org.rooms, transformRoom.toFB),
      people: transformMap(org.people, transformPerson.toFB),
      chores: transformMap(org.chores, transformChore.toFB),
      tasks: transformMap(org.tasks, transformTask.toFB),
      customActions: transformMap(org.customActions, transformAction.toFB),
      customSurfaces: transformMap(
        org.customSurfaces,
        transformSurfaceTemplate.toFB
      ),
      customRoomTypes: transformMap(
        org.customRoomTypes,
        transformRoomType.toFB
      ),
      lastId: org.lastId,
    };
  },
  fromFB(
    org: FBOrg,
    roomTypes: Map<RoomType>,
    surfaceTemplates: Map<SurfaceTemplate>
  ): Org {
    const { id, name } = org;
    const levels = transformMap(org.levels, transformLevel.fromFB);
    const rooms = transformMap(org.rooms, (room) =>
      transformRoom.fromFB(room, levels, roomTypes, surfaceTemplates)
    );
    const people = transformMap(org.people, transformPerson.fromFB);
    const tasks = transformMap(org.tasks, (t) =>
      transformTask.fromFB(t, surfaceTemplates)
    );
    const chores = transformMap(org.chores, (chore) =>
      transformChore.fromFB(chore, tasks)
    );
    return {
      id,
      name,
      levels,
      rooms,
      people,
      chores,
      tasks,
      customActions: transformMap(org.customActions, transformAction.fromFB),
      customSurfaces: transformMap(
        org.customSurfaces,
        transformSurfaceTemplate.fromFB
      ),
      customRoomTypes: transformMap(
        org.customRoomTypes,
        transformRoomType.fromFB
      ),
      lastId: org.lastId,
    };
  },
};

export const transformChore = {
  toFB(chore: ChoreTemplate): FBChoreTemplate {
    return {
      id: chore.id,
      name: chore.name,
      taskTemplateIds: transformMap(
        chore.taskTemplates,
        transformTask.dehydrate
      ),
    };
  },
  fromFB(chore: FBChoreTemplate, tasks: Map<TaskTemplate>): ChoreTemplate {
    return {
      id: chore.id,
      name: chore.name,
      taskTemplates: transformMap(chore.taskTemplateIds, (id) =>
        transformTask.hydrade(id, tasks)
      ),
    };
  },
};

export const transformTask = {
  toFB(task: TaskTemplate): FBTaskTemplate {
    return {
      id: task.id,
      actionId: task.action.name,
      surfaceTemplateId: task.surfaceTemplate?.id || '',
    };
  },
  fromFB(
    task: FBTaskTemplate,
    surfaceTemplates: Map<SurfaceTemplate>
  ): TaskTemplate {
    const action = { name: task.actionId };
    return {
      id: task.id,
      action,
      surfaceTemplate: surfaceTemplates[task.surfaceTemplateId],
    };
  },
  dehydrate(task: TaskTemplate) {
    return task.id;
  },
  hydrade(taskId: string, tasks: Map<TaskTemplate>) {
    return tasks[taskId];
  },
};

export const transformPerson = {
  toFB(person: Person): FBPerson {
    return {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName || '',
      ...(person.birthday
        ? { birthday: transformTimestamp.toFB(person.birthday) }
        : undefined),
      color: person.color || '',
    };
  },
  fromFB(person: FBPerson): Person {
    return {
      ...person,
      id: person.id || person.firstName,
      birthday: person.birthday
        ? transformTimestamp.fromFB(person.birthday)
        : undefined,
      color: person.color || '',
    };
  },
  dehydrate(person: Person): string {
    return person.id;
  },
  hydrate(personId: string, people: Map<Person>): Person {
    return people[personId];
  },
};

export const transformLevel = {
  toFB(level: Level): FBLevel {
    return level;
  },
  fromFB(level: Level): FBLevel {
    return level;
  },
  dehydrate(level: Level): string {
    return level.id;
  },
  hydrate(levelId: string, levels: Map<Level>): Level {
    return levels[levelId];
  },
};

export const transformRoom = {
  toFB(room: Room): FBRoom {
    const { name, id } = room;
    return {
      id,
      name,
      levelId: transformLevel.dehydrate(room.level),
      surfaceIds: mapToArray(room.surfaces).map(
        transformSurfaceTemplate.dehydrate
      ),
      roomTypeId: transformRoomType.dehydrate(room.roomType),
    };
  },
  fromFB(
    room: FBRoom,
    levels: Map<Level>,
    roomTypes: Map<RoomType>,
    surfaces: Map<SurfaceTemplate>
  ): Room {
    const { levelId, name, id } = room;
    return {
      id,
      name,
      level: transformLevel.hydrate(levelId, levels),
      roomType: transformRoomType.hydrate(room.roomTypeId, roomTypes),
      surfaces: arrayToMap(
        room.surfaceIds.map((id) =>
          transformSurfaceTemplate.hydrate(id, surfaces)
        )
      ),
    };
  },
};

export const transformRoomTypeRef = {
  toFB(type: string) {
    return doc(db, Collection.ROOM_TYPES, type);
  },
  fromFB(type: FBReference) {
    return type.id;
  },
};

// const transformSurface = {
//   toFB(surface: SurfaceTemplate): FBSurfaceTemplate {
//     // TODO: how to do custom surface
//     return {
//       id: surface.id,
//       name: surface.name,
//       surfaceTemplateId: transformSurfaceTemplate.dehydrate(surface),
//     };
//   },
//   fromFB(surface: FBSurface, surfaces: Map<SurfaceTemplate>): Surface {
//     return {
//       id: surface.id,
//       name: surface.name,
//       surfaceTemplate: transformSurfaceTemplate.hydrate(
//         surface.surfaceTemplateId,
//         surfaces
//       ),
//     };
//   },
//   dehydrate(surface: Surface): string {
//     return surface.id;
//   },
//   hydrate(surfaceId: string, surfaces: Map<Surface>) {
//     return surfaces[surfaceId];
//   },
// };

// TODO: what if T is not an org?
export function arrayToOrgMap<T>(array: T[], field: string = 'id'): OrgMap<T> {
  return array.reduce<OrgMap<T>>((map, thing) => {
    // @ts-expect-error
    const key = thing[field];
    map[key] = {
      orgId: key,
      data: thing,
    };
    return map;
  }, {});
}

///////// HELPERS /////////
export function getTaskName(t: Task | TaskTemplate) {
  // TODO Make this name better
  // const rooms = t.rooms;
  // const levels = t.levels;
  // const roomTypes = t.roomTypes;
  // const roomName = rooms?.name || '';
  // const roomNameWithSpace = roomName ? `${roomName} ` : '';
  // @ts-expect-error
  const tt: TaskTemplate = t.taskTemplate || t;
  const action = tt?.action?.name;
  const surface =
    tt?.surfaceTemplate?.name || `missing taskTemplate id ${tt.id}`;
  return `${action} ${surface}`.trim();
}

export function getChoreRooms(c: ChoreTemplate, allRooms: Room[]): Map<Room> {
  const rooms: Map<Room> = {};
  Object.values(c.taskTemplates).forEach((t) => {
    const surfaceId = t.surfaceTemplate.id;
    allRooms.forEach((r) => {
      if (Object.values(r.surfaces).find((s) => s.id === surfaceId))
        rooms[r.id] === r;
    });
  });
  return rooms;
}

export function getChoreRoomTypes(
  c: ChoreTemplate,
  allRooms: Room[]
): Map<RoomType> {
  const rooms = getChoreRooms(c, allRooms);
  const roomTypes: Map<RoomType> = {};
  Object.values(rooms).forEach((r) => {
    roomTypes[r.roomType.id] = r.roomType;
  });
  return roomTypes;
}

export function getChoreLevels(c: ChoreTemplate, allRooms: Room[]): Map<Level> {
  const rooms = getChoreRooms(c, allRooms);
  const levels: Map<Level> = {};
  Object.values(rooms).forEach((r) => {
    levels[r.level.id] = r.level;
  });
  return levels;
}

export function getTaskRooms(t: TaskTemplate, allRooms: Room[]): Map<Room> {
  const rooms: Map<Room> = {};
  const surfaceId = t.surfaceTemplate.id;
  allRooms.forEach((r) => {
    if (Object.values(r.surfaces).find((s) => s.id === surfaceId))
      rooms[r.id] = r;
  });
  return rooms;
}

export function getTaskRoomTypes(
  t: TaskTemplate,
  allRooms: Room[]
): Map<RoomType> {
  const rooms = getTaskRooms(t, allRooms);
  const roomTypes: Map<RoomType> = {};
  Object.values(rooms).forEach((r) => {
    roomTypes[r.roomType.id] = r.roomType;
  });
  return roomTypes;
}

export function getTaskLevels(t: TaskTemplate, allRooms: Room[]): Map<Level> {
  const rooms = getTaskRooms(t, allRooms);
  const levels: Map<Level> = {};
  Object.values(rooms).forEach((r) => {
    levels[r.level.id] = r.level;
  });
  return levels;
}
