import { doc } from '@firebase/firestore';
import { db } from '../../../firebase';
import { Collection, FirebaseReference } from '../../../firebase/types';
import { toCamelCase } from '../../../utils';
import { Action, FirebaseAction } from '../actions/types';
import { RoomType } from '../roomTypes/types';
import { transformTimestamp } from '../sharedTransformers';
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
    return {
      id,
      name,
      levels: org.levels?.map(transformLevel.fromFirebase) || [],
      rooms: org.rooms?.map(transformRoom.fromFirebase) || [],
      people: org.people?.map(transformPerson.fromFirebase) || [],
      chores: org.chores?.map(transformChore.fromFirebase) || [],
      tasks: org.tasks?.map(transformTask.fromFirebase) || [],
      customActions: org.customActions?.map(transformAction.fromFirebase) || [],
      customSurfaces:
        org.customSurfaces?.map(transformSurface.fromFirebase) || [],
      customRoomTypes:
        org.customRoomTypes?.map(transformRoomType.fromFirebase) || [],
      lastId: org.lastId,
    };
  },
};

const transformChore = {
  toFirebase(chore: Chore): FirebaseChore {
    return {
      id: '',
      name: '',
    };
  },
  fromFirebase(chore: FirebaseChore): Chore {
    return {
      id: '',
      name: '',
    };
  },
};

const transformTask = {
  toFirebase(task: Task): FirebaseTask {
    return task;
  },
  fromFirebase(task: FirebaseTask): Task {
    return { id: '', actionId: '', roomId: '', surfaceId: '' };
  },
};

const transformAction = {
  toFirebase(action: Action): FirebaseAction {
    return { id: action.id, name: action.name };
  },
  fromFirebase(action: FirebaseAction): Action {
    return {
      id: action.id || toCamelCase(action.name),
      name: action.name,
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

const transformLevel = {
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
      typeRef: doc(db, Collection.ROOM_TYPES, room.type),
    };
  },
  fromFirebase(room: FirebaseRoom): Room {
    const { level, name, id } = room;
    return {
      id: id || toCamelCase(name),
      level,
      name,
      type: roomTypeRefTransformer(room.typeRef),
      surfaces: room.surfaces?.map(transformRoomSurface.fromFirebase),
    };
  },
};

function roomTypeRefTransformer(typeRef: FirebaseReference) {
  return typeRef.id;
}

const transformRoomSurface = {
  toFirebase(surface: Surface): FirebaseSurface {
    // TODO: how to do custom surface
    // const surfaceRef = surface.id.startsWith('custom_')
    //    ? doc(db, Collection.ORGS, orgId, customSurfaces, surface.id) // ?
    //    : doc(db, Collection.SURFACES, surface.id);
    return {
      id: surface.id,
      surfaceRef: doc(db, Collection.SURFACES, surface.id),
      name: surface.name,
      descriptor: surface.descriptor || '',
    };
  },
  fromFirebase(surface: FirebaseSurface): Surface {
    return {
      id: surface.surfaceRef.id,
      name: surface.name || surface.surfaceRef.id,
      descriptor: surface.descriptor || '',
    };
  },
};
