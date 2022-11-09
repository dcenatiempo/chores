import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { roomTypes } from '../roomTypes/selectors';
import { surfaceTemplates } from '../surfaces/selectors';
import { transformMap } from '../sharedTransformers';
import { transformOrg } from './transformers';
import { initialLastId } from './reducer';

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
const people = createSelector(currentOrg, (org) => org?.people || []);
const levels = createSelector(currentOrg, (org) => org?.levels || []);
const rooms = createSelector(currentOrg, (org) => org?.rooms || []);
const chores = createSelector(currentOrg, (org) => org?.chores || []);
const name = createSelector(currentOrg, (org) => org?.name || '');
const id = createSelector(currentOrg, (org) => org?.id || '');
const tasks = createSelector(currentOrg, (org) => org?.tasks || {});
const customRoomTypes = createSelector(
  currentOrg,
  (org) => org?.customRoomTypes || {}
);
const customSurfaces = createSelector(
  currentOrg,
  (org) => org?.customSurfaces || {}
);

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
};
