import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { mapToArray, transformMap } from '../sharedTransformers';
import {
  people as peopleMap,
  levels as levelsMap,
  rooms as roomsMap,
  tasks as taskTemplateMap,
} from './../orgs/selectors';
import { roomTypes as roomTypesMap } from '../roomTypes/selectors';
import { scheduledChores as scheduledChoressMap } from '../scheduledChores/selectors';
import { transformHistoryChore } from './transformers';

const orgsChoreHistory = defaultMemoize(
  (state: RootState) => state.choreHistory.orgsMap
);

const currentOrgId = defaultMemoize(
  (state: RootState) => state.orgs.currentOrgId || ''
);

const currentChoreHistory = createSelector(
  orgsChoreHistory,
  currentOrgId,
  (orgsChoreInFlight, currentOrgId) => orgsChoreInFlight?.[currentOrgId]
);

const choreHistory = createSelector(currentChoreHistory, (cur) =>
  transformMap(cur?.data, (x) => transformHistoryChore.fromFB(x))
);

const choreHistoryArray = createSelector(choreHistory, (map) =>
  mapToArray(map)
);

const feedChores = createSelector(
  currentChoreHistory,
  scheduledChoressMap,
  peopleMap,
  taskTemplateMap,
  levelsMap,
  roomTypesMap,
  roomsMap,
  (cur, scheduledChores, people, taskTemplates, levels, roomTypes, rooms) =>
    transformMap(cur?.data, (x) =>
      transformHistoryChore.hydrate(
        transformHistoryChore.fromFB(x),
        scheduledChores,
        people,
        taskTemplates,
        levels,
        roomTypes,
        rooms
      )
    )
);

const feedChoresArray = createSelector(feedChores, (map) => mapToArray(map));

export {
  currentOrgId,
  choreHistory,
  choreHistoryArray,
  feedChores,
  feedChoresArray,
};
