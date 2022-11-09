import { doc } from '@firebase/firestore';
import { db } from '../../../firebase';
import { Collection, FirebaseReference } from '../../../firebase/types';
import { toCamelCase } from '../../../utils';
import actions from '../actions';
import { transformAction } from '../actions/transformers';
import { Action, FirebaseAction } from '../actions/types';
import { RoomType } from '../roomTypes/types';
import { transformReference, transformTimestamp } from '../sharedTransformers';
import {
  FirebaseSurfaceTemplate,
  Surface,
  SurfaceTemplate,
} from '../surfaces/types';
import {
  Chore,
  FirebaseChore,
  FirebaseCustomRoomType,
  FirebaseLevel,
  FirebaseOrg,
  FirebasePerson,
  FirebaseRoom,
  FirebaseSurface,
  FirebaseTask,
  Level,
  Org,
  Person,
  Room,
  Task,
} from './types';

export const transformOrgs = {
  fromFirebase(orgs: FirebaseOrg[]): Org[] {
    return orgs.map((org) => transformOrg.fromFirebase(org));
  },
  toFirebase(orgs: Org[]): FirebaseOrg[] {
    return orgs.map((org) => transformOrg.toFirebase(org));
  },
};

export const transformOrg = {
  toFirebase(org: Org): FirebaseOrg {
    const { id, name } = org;
    return {
      id,
      name,
      levels: org.levels?.map(transformLevel.toFirebase) || [],
      rooms: org.rooms?.map(transformRoom.toFirebase) || [],
      people: org.people?.map(transformPerson.toFirebase) || [],
      chores: org.chores?.map(transformChore.toFirebase) || [],
      tasks: org.tasks?.map(transformTask.toFirebase) || [],
      customActions: org.customActions?.map(transformAction.toFirebase) || [],
      customSurfaces:
        org.customSurfaces?.map(transformSurface.toFirebase) || [],
      customRoomTypes:
        org.customRoomTypes?.map(transformRoomType.toFirebase) || [],
      lastId: org.lastId,
    };
  },
  fromFirebase(org: FirebaseOrg): Org {
    const { id, name } = org;
    const rooms = org.rooms?.map(transformRoom.fromFirebase) || [];
    return {
      id,
      name,
      levels: org.levels?.map(transformLevel.fromFirebase) || [],
      rooms,
      people: org.people?.map(transformPerson.fromFirebase) || [],
      chores: org.chores?.map(transformChore.fromFirebase) || [],
      tasks: org.tasks?.map((t) => transformTask.fromFirebase(t, rooms)) || [],
      customActions: org.customActions?.map(transformAction.fromFirebase) || [],
      customSurfaces:
        org.customSurfaces?.map(transformSurface.fromFirebase) || [],
      customRoomTypes:
        org.customRoomTypes?.map(transformRoomType.fromFirebase) || [],
      lastId: org.lastId,
    };
  },
};

export const transformChore = {
  toFirebase(chore: Chore): FirebaseChore {
    return {
      id: chore.id,
      name: chore.name,
      taskIds: chore.taskIds,
      defaultPeople: chore.defaultPeople,
    };
  },
  fromFirebase(chore: FirebaseChore): Chore {
    return chore;
  },
};

export const transformTask = {
  toFirebase(task: Task): FirebaseTask {
    return {
      id: task.id,
      actionId: task.action.name,
      surfaceId: task.surface?.id || '',
      roomId: task.room?.id || '',
    };
  },
  fromFirebase(task: FirebaseTask, rooms: Room[]): Task {
    const room = rooms.find((r) => (r.id = task.id));
    return {
      id: task.id,
      action: { name: task.actionId },
      room,
      surface: room?.surfaces.find((s) => s.id === task.surfaceId),
    };
  },
};

const transformSurface = {
  fromFirebase(surfaceTemplate: FirebaseSurfaceTemplate): SurfaceTemplate {
    return {
      id: surfaceTemplate?.id || toCamelCase(surfaceTemplate.name),
      name: surfaceTemplate.name,
      descriptors: surfaceTemplate.descriptors,
    };
  },
  toFirebase(surfaceTemplate: SurfaceTemplate): FirebaseSurfaceTemplate {
    return surfaceTemplate;
  },
};

const transformRoomType = {
  fromFirebase(type: FirebaseCustomRoomType): RoomType {
    return {
      id: type.id || toCamelCase(type.name),
      name: type.name,
      description: type.description,
    };
  },
  toFirebase(type: RoomType): FirebaseCustomRoomType {
    return { id: type.id, description: type.description, name: type.name };
  },
};

export const transformPerson = {
  toFirebase(person: Person): FirebasePerson {
    return {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName || '',
      ...(person.birthday
        ? { birthday: transformTimestamp.toFirebase(person.birthday) }
        : undefined),
    };
  },
  fromFirebase(person: FirebasePerson): Person {
    return {
      ...person,
      id: person.id || person.firstName, // todo: remove once data is clean
      birthday: person.birthday
        ? transformTimestamp.fromFirebase(person.birthday)
        : undefined,
    };
  },
};

export const transformLevel = {
  toFirebase(level: Level): FirebaseLevel {
    return level;
  },
  fromFirebase(level: FirebaseLevel): Level {
    return level;
  },
};

export const transformRoom = {
  toFirebase(room: Room): FirebaseRoom {
    const { level, name, id } = room;
    return {
      id,
      level,
      name,
      surfaces: room.surfaces?.map(transformRoomSurface.toFirebase),
      typeRef: transformRoomTypeRef.toFirebase(room.type),
    };
  },
  fromFirebase(room: FirebaseRoom): Room {
    const { level, name, id } = room;
    return {
      id: id || toCamelCase(name),
      level,
      name,
      type: transformRoomTypeRef.fromFirebase(room.typeRef),
      surfaces: room.surfaces?.map(transformRoomSurface.fromFirebase),
    };
  },
};

export const transformRoomTypeRef = {
  toFirebase(type: string) {
    return doc(db, Collection.ROOM_TYPES, type);
  },
  fromFirebase(type: FirebaseReference) {
    return type.id;
  },
};

const transformRoomSurface = {
  toFirebase(surface: Surface): FirebaseSurface {
    // TODO: how to do custom surface
    // const surfaceRef = surface.id.startsWith('custom_')
    //    ? doc(db, Collection.ORGS, orgId, customSurfaces, surface.id) // ?
    //    : doc(db, Collection.SURFACES, surface.id);
    return {
      id: surface.id,
      surfaceRef: transformReference.toFirebase(
        Collection.SURFACES,
        surface.surfaceId
      ),
      descriptor: surface.descriptor || '',
    };
  },
  fromFirebase(surface: FirebaseSurface): Surface {
    return {
      id: surface.id,
      surfaceId: transformReference.fromFirebase(surface.surfaceRef),
      descriptor: surface.descriptor || '',
    };
  },
};
