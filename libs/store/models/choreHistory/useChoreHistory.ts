import { useDispatch, useSelector } from 'react-redux';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { HistoryChore } from './types';
import {
  addEntityToCollection,
  Collection,
  OrgEntityType,
  updateEntitiesFromOrg,
} from '../../../firebase';
import { transformHistoryChore } from './transformers';

export default function useChoreHistory() {
  const dispatch = useDispatch();

  async function fetchOrgsChoreHistory(orgIds: string[]) {
    return firebase.fetchOrgsChoreHistory(orgIds).then((orgChoreHistory) => {
      dispatch(actions.setOrgChoreHistory(orgChoreHistory));
    });
  }

  const orgId = useSelector(selectors.currentOrgId);
  const choreHistory = useSelector(selectors.choreHistory);
  const choreHistoryArray = useSelector(selectors.choreHistoryArray);
  const historyFeedChores = useSelector(selectors.historyFeedChores);
  const historyFeedChoresArray = useSelector(selectors.historyFeedChoresArray);

  const scheduledChoreConfig = {
    transformEntity: transformHistoryChore,
    collection: Collection.ORG_SCHEDULED_CHORES,
    entityType: OrgEntityType.SCHEDULED_CHORES,
  };

  function addHistoryChore(chore: HistoryChore) {
    if (!orgId) return;
    addEntityToCollection({
      orgId,
      entity: chore,
      ...scheduledChoreConfig,
    });
  }

  function editHistoryChore(chore: HistoryChore) {
    if (!orgId) return;

    const choreHistoryCopy = { ...choreHistory };
    choreHistoryCopy[chore.id] = chore;
    updateEntitiesFromOrg({
      entities: choreHistoryCopy,
      orgId,
      ...scheduledChoreConfig,
    });
  }

  function deleteHistoryChore(chore: HistoryChore) {
    if (!orgId) return;

    const choreHistoryCopy = { ...choreHistory };
    delete choreHistoryCopy[chore.id];
    updateEntitiesFromOrg({
      entities: choreHistoryCopy,
      orgId,
      ...scheduledChoreConfig,
    });
  }

  return {
    historyFeedChores,
    historyFeedChoresArray,
    choreHistory,
    choreHistoryArray,
    addHistoryChore,
    editHistoryChore,
    deleteHistoryChore,
    fetchOrgsChoreHistory,
  };
}
