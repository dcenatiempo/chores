import { doc } from '@firebase/firestore';
import { db } from '../../../firebase';
import { Collection, FBReference } from '../../../firebase/types';
import { transformAction } from '../actions/transformers';
import { transformRoomType } from '../roomTypes/transformers';
import { FBRoomType, RoomType } from '../roomTypes/types';
import { transformMap, transformTimestamp } from '../sharedTransformers';
import { transformSurfaceTemplate } from '../surfaces/transformers';
import { FBSurface, Surface, SurfaceTemplate } from '../surfaces/types';
import { Map, OrgMap } from '../types';
import {
  Chore,
  FBChore,
  FBLevel,
  FBOrg,
  FBPerson,
  FBRoom,
  FBTask,
  Level,
  Org,
  Person,
  Room,
  Task,
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
      transformTask.fromFB(t, rooms, roomTypes, surfaceTemplates)
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
  toFB(chore: Chore): FBChore {
    return {
      id: chore.id,
      name: chore.name,
      taskIds: transformMap(chore.tasks, transformTask.dehydrate),
    };
  },
  fromFB(chore: FBChore, tasks: Map<Task>): Chore {
    return {
      id: chore.id,
      name: chore.name,
      tasks: transformMap(chore.taskIds, (id) =>
        transformTask.hydrade(id, tasks)
      ),
    };
  },
};

export const transformTask = {
  toFB(task: Task): FBTask {
    return {
      id: task.id,
      actionId: task.action.name,
      surfaceId: task.surface?.id || '',
      surfaceTemplateId: task.surfaceTemplate?.id || '',
      roomId: task.room?.id || '',
      roomTypeId: task.roomType?.id || '',
    };
  },
  fromFB(
    task: FBTask,
    rooms: Map<Room>,
    roomTypes: Map<RoomType>,
    surfaceTemplates: Map<SurfaceTemplate>
  ): Task {
    const action = { name: task.actionId };
    const room = task.roomId ? rooms?.[task.roomId] : undefined;
    const surface = task.surfaceId ? room?.surfaces[task.surfaceId] : undefined;
    return {
      id: task.id,
      action,
      room,
      roomType: task.roomTypeId ? roomTypes[task.roomTypeId] : undefined,
      surface,
      surfaceTemplate: task.surfaceTemplateId
        ? surfaceTemplates[task.surfaceTemplateId]
        : undefined,
    };
  },
  dehydrate(task: Task) {
    return task.id;
  },
  hydrade(taskId: string, tasks: Map<Task>) {
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
    };
  },
  fromFB(person: FBPerson): Person {
    return {
      ...person,
      id: person.id || person.firstName,
      birthday: person.birthday
        ? transformTimestamp.fromFB(person.birthday)
        : undefined,
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
      surfaces: transformMap(room.surfaces, transformSurface.toFB),
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
      surfaces: transformMap(room.surfaces, (surface) =>
        transformSurface.fromFB(surface, surfaces)
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

const transformSurface = {
  toFB(surface: Surface): FBSurface {
    // TODO: how to do custom surface
    return {
      id: surface.id,
      name: surface.name,
      surfaceTemplateId: transformSurfaceTemplate.dehydrate(
        surface.surfaceTemplate
      ),
    };
  },
  fromFB(surface: FBSurface, surfaces: Map<SurfaceTemplate>): Surface {
    return {
      id: surface.id,
      name: surface.name,
      surfaceTemplate: transformSurfaceTemplate.hydrate(
        surface.surfaceTemplateId,
        surfaces
      ),
    };
  },
  dehydrate(surface: Surface): string {
    return surface.id;
  },
  hydrate(surfaceId: string, surfaces: Map<Surface>) {
    return surfaces[surfaceId];
  },
};

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
export function getTaskName(t: Task) {
  return `${t.action.name} ${t.room?.name || t.roomType?.name} ${
    t.surface?.name || t.surfaceTemplate?.name
  }`;
}
