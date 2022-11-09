import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { surfaces } from '../surfaces/selectors';

const orgsMap = defaultMemoize((state: RootState) => state.orgs.orgsMap);
const orgsArray = createSelector(orgsMap, (map) => {
  Object.keys(orgsMap).map((key) => {
    // @ts-expect-error
    return orgsMap[key].data;
  });
});

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId
);

const currentOrg = createSelector(
  orgsMap,
  currentOrgId,
  (orgs, currentOrgId) => orgs?.[currentOrgId || '']?.data || {}
);

const lastId = createSelector(currentOrg, (org) => org?.lastId);
const people = createSelector(currentOrg, (org) => org?.people || []);
const levels = createSelector(currentOrg, (org) => org?.levels || []);
const rooms = createSelector(currentOrg, (org) => org?.rooms || []);
const chores = createSelector(currentOrg, (org) => org?.chores || []);
const name = createSelector(currentOrg, (org) => org?.name || '');
const id = createSelector(currentOrg, (org) => org?.id);
const tasks = createSelector(currentOrg, (org) => org?.tasks);
const customRoomTypes = createSelector(
  currentOrg,
  (org) => org?.customRoomTypes
);
const customSurfaces = createSelector(currentOrg, (org) => org?.customSurfaces);

const orgs = orgsArray;
export {
  orgs,
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
