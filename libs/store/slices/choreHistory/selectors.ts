import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const orgsChoreHistory = defaultMemoize(
  (state: RootState) => state.choreHistory.orgsMap
);

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId
);

const choreHistory = createSelector(
  orgsChoreHistory,
  currentOrgId,
  (orgsChoreHistory, currentOrgId) => orgsChoreHistory?.[currentOrgId || '']
);

export { choreHistory };
