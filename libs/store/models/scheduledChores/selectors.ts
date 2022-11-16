import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { transformChore } from '../orgs/transformers';
import { initialLastId } from './reducer';
import { transformScheduledScheduledChore } from './transformers';

const orgsScheduledChore = defaultMemoize(
  (state: RootState) => state.scheduledChores.orgsMap
);

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId || ''
);

const currentScheduledChores = createSelector(
  orgsScheduledChore,
  currentOrgId,
  (orgsScheduledChore, currentOrgId) => orgsScheduledChore?.[currentOrgId]
);

const lastId = createSelector(
  currentScheduledChores,
  (cur) => cur?.lastId || initialLastId
);

const scheduledChores = createSelector(
  currentScheduledChores,
  (cur) =>
    cur?.data?.map((c) => transformScheduledScheduledChore.fromFB(c)) || []
);

export { currentOrgId, lastId, scheduledChores };
