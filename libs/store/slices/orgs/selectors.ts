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

const currentOrganization = createSelector(
  orgsMap,
  currentOrgId,
  (orgs, currentOrgId) => orgs?.[currentOrgId || '']?.data
);

const people = createSelector(currentOrganization, (org) => org?.people);
const levels = createSelector(currentOrganization, (org) => org?.levels);
const rooms = createSelector(currentOrganization, (org) => org?.rooms);
const chores = createSelector(currentOrganization, (org) => org?.chores);
const name = createSelector(currentOrganization, (org) => org?.name);
const id = createSelector(currentOrganization, (org) => org?.id);

const orgs = orgsArray;
export { orgs, currentOrganization, people, levels, rooms, chores, name, id };
