import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { roomTypes } from '../roomTypes/selectors';
import { surfaceTemplates, surfaceTemplatesArray } from '../surfaces/selectors';
import { SurfaceTemplate } from '../../models/surfaces/types';
import { mapToArray, transformMap } from '../sharedTransformers';
import { transformOrg } from './transformers';
import { initialLastId } from './reducer';
import { Level, Room } from './types';
import { Map } from '../types';
import { actions } from '../actions/selectors';
import { RoomType } from '../roomTypes/types';

const fbOrgsMap = defaultMemoize((state: RootState) => state.orgs.orgsMap);

const orgsMap = createSelector(
  fbOrgsMap,
  roomTypes,
  surfaceTemplates,
  (fbom, rt, st) =>
    transformMap(fbom, (x) => transformOrg.fromFB(x.data, rt, st))
);

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId
);

const currentOrg = createSelector(
  orgsMap,
  currentOrgId,
  (orgs, currentOrgId) => orgs?.[currentOrgId || ''] || {}
);

const lastId = createSelector(
  currentOrg,
  (org) => org?.lastId || initialLastId
);
const id = createSelector(currentOrg, (org) => org?.id || '');
const name = createSelector(currentOrg, (org) => org?.name || '');
const people = createSelector(currentOrg, (org) => org?.people || {});
const levels = createSelector(currentOrg, (org) => org?.levels || {});
const rooms = createSelector(currentOrg, (org) => org?.rooms || {});
const chores = createSelector(currentOrg, (org) => org?.chores || {});
const tasks = createSelector(currentOrg, (org) => org?.tasks || {});
const choresArray = createSelector(chores, (c) => mapToArray(c));
const peopleArray = createSelector(people, (p) => mapToArray(p));
const roomsArray = createSelector(rooms, (r) => mapToArray(r));
const tasksArray = createSelector(tasks, (t) => mapToArray(t));
const levelsArray = createSelector(levels, (l) => mapToArray(l));
const roomsGroupedByLevel = createSelector(roomsArray, (ra) => {
  return ra.reduce<{ [level: string]: Room[] }>((acc, r) => {
    const levelId = r.level.id;
    if (!acc[levelId]) acc[levelId] = [];
    acc[levelId] = [...acc[levelId], r];
    return { ...acc };
  }, {});
});
const roomsGroupedByRoomType = createSelector(roomsArray, (ra) => {
  return ra.reduce<{ [roomType: string]: Room[] }>((acc, r) => {
    const roomTypeId = r.roomType.id;
    if (!acc[roomTypeId]) acc[roomTypeId] = [];
    acc[roomTypeId] = [...acc[roomTypeId], r];
    return { ...acc };
  }, {});
});

const roomTypesGroupedByLevel = createSelector(roomsArray, (ra) => {
  return ra.reduce<{ [level: string]: RoomType[] }>((acc, r) => {
    const roomTypeId = r.roomType.id;
    const levelId = r.level.id;

    if (!acc[levelId]) acc[levelId] = [];
    if (!acc[levelId].find((rt) => rt.id === roomTypeId)) {
      acc[levelId].push(r.roomType);
    }
    return { ...acc };
  }, {});
});

const customRoomTypes = createSelector(
  currentOrg,
  (org) => org?.customRoomTypes || {}
);
const customSurfaces = createSelector(
  currentOrg,
  (org) => org?.customSurfaces || {}
);

const levelsInUse = createSelector(levels, roomsArray, (la, ra) => {
  const liu: Level[] = [];
  Object.values(la).forEach((l) => {
    const inUse = ra.some((r) => r.level.id === l.id);
    if (inUse) liu.push(l);
  });
  return liu;
});

const surfacesInUse = createSelector(surfaceTemplates, roomsArray, (st, ra) => {
  const siuMap: Map<SurfaceTemplate> = {};
  ra.forEach((r) => {
    Object.values(r.surfaces).forEach((s) => {
      const key = s.surfaceTemplate.id;
      if (!siuMap[key] && st[key]) siuMap[key] = st[key];
    });
  });
  return mapToArray(siuMap);
});

const roomTypesInUse = createSelector(roomTypes, roomsArray, (rt, ra) => {
  const rtiuMap: Map<RoomType> = {};
  ra.forEach((r) => {
    const key = r.roomType.id;
    if (!rtiuMap[key] && rt[key]) rtiuMap[key] = rt[key];
  });
  return mapToArray(rtiuMap);
});

export {
  currentOrg,
  people,
  levels,
  rooms,
  chores,
  name,
  id,
  lastId,
  tasks,
  customRoomTypes,
  customSurfaces,
  choresArray,
  peopleArray,
  roomsArray,
  tasksArray,
  levelsArray,
  roomsGroupedByLevel,
  roomsGroupedByRoomType,
  roomTypesGroupedByLevel,
  surfacesInUse,
  // actionsInUse,
  roomTypesInUse,
  levelsInUse,
};
