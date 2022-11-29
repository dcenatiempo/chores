import { useDispatch, useSelector } from 'react-redux';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { CreateHistoryChoreInput, FBHistoryChore, HistoryChore } from './types';
import {
  addEntityToCollection,
  Collection,
  deleteEntityFromCollection,
  listenForDocChanges,
  listenForDocsChanges,
  OrgEntityType,
  updateEntitiesFromOrg,
  updateEntityFromCollection,
} from '../../../firebase';
import { transformHistoryChore } from './transformers';
import { ScheduledChore, UIChoreFeedItem } from '../scheduledChores/types';
import { DateTime } from 'luxon';
import { transformTimestamp } from '../sharedTransformers';
import { where } from 'firebase/firestore';
import { useCallback, useRef, useState } from 'react';
import { UnixTimestamp } from '../../../dateTime';

export default function useChoreHistory() {
  const dispatch = useDispatch();
  const unsubscribe = useRef<() => void>();

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

  function addHistoryChore(chore: CreateHistoryChoreInput) {
    if (!orgId) return;
    addEntityToCollection({
      orgId,
      entity: chore,
      collection: Collection.CHORE_HISTORY,
    });
  }

  function editHistoryChore(chore: HistoryChore) {
    if (!orgId) return;
    updateEntityFromCollection({
      entity: chore,
      collection: Collection.CHORE_HISTORY,
      transformEntity: transformHistoryChore,
    });
  }

  function deleteHistoryChore(chore: HistoryChore) {
    deleteEntityFromCollection({
      entity: chore,
      collection: Collection.CHORE_HISTORY,
    });
  }

  function getCreateHistoryChoreInputFromScheduledChore(
    chore: ScheduledChore,
    dueDate: UnixTimestamp
  ): CreateHistoryChoreInput {
    const date = dueDate || DateTime.local().startOf('day').toSeconds();
    return {
      orgId: orgId,
      personId: chore.personId,
      scheduledChoreId: chore.id,
      startDate: transformTimestamp.toFB(date),
      dueDate: transformTimestamp.toFB(date),
      taskIdsCompleted: [],
    };
  }

  const listenForChoreHistoryChanges = useCallback(
    (id: string) => {
      unsubscribe.current?.();
      const _unsubscribe = listenForDocsChanges({
        collectionName: Collection.CHORE_HISTORY,
        callback: (entities: FBHistoryChore[]) => {
          dispatch(actions.setOrgChoreHistory(entities));
        },
        queries: [where('orgId', '==', id)],
      });
      unsubscribe.current = _unsubscribe;
    },
    [dispatch, unsubscribe]
  );

  return {
    historyFeedChores,
    historyFeedChoresArray,
    choreHistory,
    choreHistoryArray,
    addHistoryChore,
    editHistoryChore,
    deleteHistoryChore,
    fetchOrgsChoreHistory,
    getCreateHistoryChoreInputFromScheduledChore,
    listenForChoreHistoryChanges,
  };
}
