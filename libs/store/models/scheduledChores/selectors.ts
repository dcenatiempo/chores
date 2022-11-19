import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { transformChore } from '../orgs/transformers';
import { arrayToMap, mapToArray, transformMap } from '../sharedTransformers';
import { initialLastId } from './reducer';
import { transformScheduledChore } from './transformers';

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

const scheduledChores = createSelector(currentScheduledChores, (cur) =>
  transformMap(cur?.data, (x) => transformScheduledChore.fromFB(x))
);

const scheduledChoresArray = createSelector(scheduledChores, (map) =>
  mapToArray(map)
);

export {
  currentOrgId,
  lastId,
  scheduledChores,
  scheduledChoresArray,
  orgsScheduledChore,
  currentScheduledChores,
};
