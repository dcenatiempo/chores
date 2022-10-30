import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

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

const people = createSelector(currentOrg, (org) => org?.people || []);
const levels = createSelector(currentOrg, (org) => org?.levels || []);
const rooms = createSelector(currentOrg, (org) => org?.rooms || []);
const chores = createSelector(currentOrg, (org) => org?.chores || []);
const name = createSelector(currentOrg, (org) => org?.name || '');
const id = createSelector(currentOrg, (org) => org?.id);

const orgs = orgsArray;
export { orgs, currentOrg, people, levels, rooms, chores, name, id };
