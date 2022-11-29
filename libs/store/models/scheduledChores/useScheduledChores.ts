import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementHex } from '../../../utils';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { ScheduledChore } from './types';
import {
  addEntityToOrgCollection,
  OrgCollection,
  OrgEntityType,
  updateEntitiesFromOrg,
} from '../../../firebase';
import { transformScheduledChore } from './transformers';

export default function useScheduledChores() {
  const dispatch = useDispatch();

  async function fetchOrgsScheduledChores(orgIds: string[]) {
    return firebase
      .fetchOrgsScheduledChores(orgIds)
      .then((orgsScheduledChores) => {
        dispatch(actions.setOrgsScheduledChores(orgsScheduledChores));
      });
  }

  const orgId = useSelector(selectors.currentOrgId);
  const scheduledChores = useSelector(selectors.scheduledChores);
  const scheduledChoresArray = useSelector(selectors.scheduledChoresArray);
  const feedChores = useSelector(selectors.feedChores);
  const feedChoresArray = useSelector(selectors.feedChoresArray);

  const lastId = useSelector(selectors.lastId);
  const lastIdRef = useRef(lastId);

  useEffect(() => {
    if (lastId > lastIdRef.current) lastIdRef.current = lastId;
  }, [lastId]);

  function getNextId() {
    if (!lastIdRef.current) lastIdRef.current = lastId;
    const newLastId = incrementHex(lastIdRef.current);
    lastIdRef.current = newLastId;
    dispatch(actions.setLastId({ orgId, lastId: newLastId }));
    return newLastId;
  }

  const scheduledChoreConfig = {
    transformEntity: transformScheduledChore,
    collection: OrgCollection.ORG_SCHEDULED_CHORES,
    entityType: OrgEntityType.SCHEDULED_CHORES,
  };

  function addScheduledChore(chore: ScheduledChore) {
    if (!orgId) return;
    addEntityToOrgCollection({
      orgId,
      entity: { ...chore, id: getNextId() },
      ...scheduledChoreConfig,
    });
  }

  function editScheduledChore(chore: ScheduledChore) {
    if (!orgId) return;

    const scheduledChoresCopy = { ...scheduledChores };
    scheduledChoresCopy[chore.id] = chore;
    updateEntitiesFromOrg({
      entities: scheduledChoresCopy,
      orgId,
      ...scheduledChoreConfig,
    });
  }

  function deleteScheduledChore(chore: ScheduledChore) {
    if (!orgId) return;

    const scheduledChoresCopy = { ...scheduledChores };
    delete scheduledChoresCopy[chore.id];
    updateEntitiesFromOrg({
      entities: scheduledChoresCopy,
      orgId,
      ...scheduledChoreConfig,
    });
  }

  return {
    feedChores,
    feedChoresArray,
    scheduledChores,
    scheduledChoresArray,
    addScheduledChore,
    editScheduledChore,
    deleteScheduledChore,
    fetchOrgsScheduledChores,
    getNextId,
  };
}
