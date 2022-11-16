import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementHex } from '../../../utils';
import { mapToArray } from '../sharedTransformers';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import * as firebase from './firebase';

export default function useCurrentOrg() {
  const dispatch = useDispatch();

  async function fetchOrgsScheduledChores(orgIds: string[]) {
    return firebase
      .fetchOrgsScheduledChores(orgIds)
      .then((orgsScheduledChores) => {
        dispatch(actions.setOrgsScheduledChores(orgsScheduledChores));
      });
  }

  const currentOrgId = useSelector(selectors.currentOrgId);
  const scheduledChores = useSelector(selectors.scheduledChores);

  const scheduledChoresFeed = useMemo(() => {
    const feed = [];
    scheduledChores.forEach((chore) => {
      // TODO
    });
    return feed;
  }, [scheduledChores]);

  const lastId = useSelector(selectors.lastId);
  const lastIdRef = useRef(lastId);

  useEffect(() => {
    if (lastId > lastIdRef.current) lastIdRef.current = lastId;
  }, [lastId]);

  function getNextId() {
    if (!lastIdRef.current) lastIdRef.current = lastId;
    const newLastId = incrementHex(lastIdRef.current);
    lastIdRef.current = newLastId;
    dispatch(actions.setLastId({ currentOrgId, lastId: newLastId }));
    return newLastId;
  }

  // function addRoom(room: Room) {
  //   if (!orgId) return;

  //   addRoomToOrg({
  //     orgId: orgId,
  //     entity: {
  //       ...room,
  //       surfaces: room.surfaces,
  //       id: getNextId(),
  //     },
  //   });
  // }

  // function editRoom(room: Room) {
  //   if (!orgId) return;
  //   const roomsCopy = { ...rooms };
  //   roomsCopy[room.id] = room;
  //   updateRoomsFromOrg({
  //     entities: roomsCopy,
  //     orgId,
  //   });
  // }

  // function deleteRoom({ id }: Room) {
  //   if (!orgId) return;
  //   const roomsCopy = { ...rooms };
  //   delete roomsCopy[id];
  //   updateRoomsFromOrg({
  //     entities: roomsCopy,
  //     orgId: orgId,
  //   });
  // }

  return { fetchOrgsScheduledChores, getNextId };
}
