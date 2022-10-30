import type {
  FirebaseChore,
  FirebaseCustomAction,
  FirebaseCustomRoomType,
  FirebaseCustomSurface,
  FirebaseLevel,
  FirebaseOrg,
  FirebasePerson,
  FirebaseReference,
  FirebaseRoom,
  FirebaseRoomSurface,
  FirebaseTask,
} from '../../../firebase/types';
import { toCamelCase } from '../../../utils';
import { Action, FirebaseAction } from '../actions/types';
import { FirebaseRoomType, RoomType } from '../roomTypes/types';
import { timestampTransformer } from '../sharedTransformers';
import { FirebaseSurface, Surface } from '../surfaces/types';
import { Chore, Level, Org, OrgsMap, Person, Room, Task } from './types';

// firebase data => store data
export function transformOrgsFromFirebase(orgs: FirebaseOrg[]): Org[] {
  return orgs.map((org) => transformOrgFromFirebase(org));
}

export function transformOrgFromFirebase(org: FirebaseOrg): Org {
  const { id, name } = org;
  return {
    id,
    name,
    levels: levelsTransformer(org.levels),
    rooms: roomsTransformer(org.rooms),
    people: peopleTransformer(org.people),
    chores: choresTransformer(org.chores),
    tasks: tasksTransformer(org.tasks),
    customActions: actionsTransformer(org.customActions),
    customSurfaces: surfacesTransformer(org.customSurfaces),
    customRoomTypes: roomTypesTransformer(org.customRoomTypes),
  };
}

function actionsTransformer(
  actions: (FirebaseAction | FirebaseCustomAction)[] = []
): Action[] {
  return actions.map(actionTransformer);
}

function actionTransformer(
  action: FirebaseAction | FirebaseCustomAction
): Action {
  return {
    // @ts-ignore
    id: action?.id || toCamelCase(action.name),
    name: action.name,
  };
}

function surfacesTransformer(
  surfaces: (FirebaseSurface | FirebaseCustomSurface)[] = []
): Surface[] {
  return surfaces.map(surfaceTransformer);
}

function surfaceTransformer(
  surface: FirebaseSurface | FirebaseCustomSurface
): Surface {
  return {
    // @ts-ignore
    id: surface?.id || toCamelCase(surface.name),
    name: surface.name,
    descriptor: surface.descriptor,
  };
}

function roomTypesTransformer(
  roomTypes: (FirebaseRoomType | FirebaseCustomRoomType)[] = []
): RoomType[] {
  return roomTypes.map(roomTypeTransformer);
}

function roomTypeTransformer(
  type: FirebaseRoomType | FirebaseCustomRoomType
): RoomType {
  return {
    // @ts-ignore
    id: type?.id || toCamelCase(type.name),
    name: type.name,
    description: type.description,
  };
}

function levelsTransformer(levels: FirebaseLevel[]): Level[] {
  return levels;
}

function choresTransformer(chores: FirebaseChore[]): Chore[] {
  return chores;
}

function tasksTransformer(tasks: FirebaseTask[]): Task[] {
  return [
    {
      id: '',
      actionId: '',
      roomId: '',
      surfaceId: '',
    },
  ];
}

function peopleTransformer(people: FirebasePerson[]): Person[] {
  return people?.map((person) => {
    return { ...person, birthday: timestampTransformer(person.birthday) };
  });
}

function roomsTransformer(rooms: FirebaseRoom[]): Room[] {
  const newRooms =
    rooms?.map((room, i) => {
      const { level, name } = room;
      return {
        id: `${i}`,
        level,
        name,
        type: roomTypeRefTransformer(room.typeRef),
        surfaceIds: roomSurfacesTransformer(room.surfaces),
      };
    }) || [];
  return newRooms;
}

function roomTypeRefTransformer(typeRef: FirebaseReference) {
  return typeRef.id;
}

function roomSurfacesTransformer(
  surfaces: FirebaseRoomSurface[] = []
): string[] {
  return surfaces.map((surface) => surface.surfaceRef.id);
}
