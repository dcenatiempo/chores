import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { mapToArray, transformMap } from '../sharedTransformers';
import { initialLastId } from './reducer';
import { transformScheduledChore } from './transformers';
import { people as peopleMap, chores as choresMap } from './../orgs/selectors';

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

const feedChores = createSelector(
  currentScheduledChores,
  choresMap,
  peopleMap,
  (cur, chores, people) =>
    transformMap(cur?.data, (x) =>
      transformScheduledChore.hydrate(
        transformScheduledChore.fromFB(x),
        chores,
        people
      )
    )
);

const feedChoresArray = createSelector(feedChores, (map) => mapToArray(map));

export {
  currentOrgId,
  lastId,
  scheduledChores,
  scheduledChoresArray,
  orgsScheduledChore,
  currentScheduledChores,
  feedChores,
  feedChoresArray,
};
