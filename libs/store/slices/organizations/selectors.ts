import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const organizations = defaultMemoize(
  (state: RootState) => state.organizations.data
);

const currentOrganization = defaultMemoize((state: RootState) => {
  const currentOrgId = state.user.currentOrganizationdId;
  return state.organizations.data.find((org) => org.id === currentOrgId);
});

const people = createSelector(currentOrganization, (org) => org?.people);
const levels = createSelector(currentOrganization, (org) => org?.levels);
const rooms = createSelector(currentOrganization, (org) => org?.rooms);
const chores = createSelector(currentOrganization, (org) => org?.chores);
const name = createSelector(currentOrganization, (org) => org?.name);

export {
  organizations,
  currentOrganization,
  people,
  levels,
  rooms,
  chores,
  name,
};
