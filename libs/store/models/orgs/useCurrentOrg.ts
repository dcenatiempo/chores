import { useDispatch, useSelector } from 'react-redux';
import {
  addLevelToOrg,
  addPersonToOrg,
  addRoomtoOrg,
  updateLevelsFromOrg,
  updatePeopleFromOrg,
  updateRoomsFromOrg,
} from '../../../firebase';
import { incrementHex } from '../../../utils';
import { actions } from './reducer';
import * as selectors from './selectors';
import { Level, Person, Room } from './types';

export default function useCurrentOrg() {
  const dispatch = useDispatch();
  const org = useSelector(selectors.currentOrg);
  const rooms = useSelector(selectors.rooms);
  const people = useSelector(selectors.people);
  const orgName = useSelector(selectors.name);
  const orgId = useSelector(selectors.id);
  const levels = useSelector(selectors.id);
  const lastId = useSelector(selectors.lastId);

  function getNextId() {
    const newLastId = incrementHex(lastId);
    dispatch(actions.setLastId(newLastId));
    return newLastId;
  }

  function addPerson(person: Person) {
    if (!orgId) return;
    addPersonToOrg({
      person: { ...person, id: getNextId() },
      orgId: orgId,
    });
  }

  function addRoom(room: Room) {
    if (!orgId) return;
    addRoomtoOrg({
      orgId: orgId,
      room: { ...room, id: getNextId() },
    });
  }

  function addLevel(level: Level) {
    if (!orgId) return;
    addLevelToOrg({
      orgId: orgId,
      level,
    });
  }

  function editRoom(room: Room) {
    if (!orgId) return;
    updateRoomsFromOrg({
      rooms: org.rooms?.map((r) => (r.id === room.id ? room : r)) || [],
      orgId: orgId,
    });
  }

  function editPerson(person: Person) {
    if (!orgId) return;
    updatePeopleFromOrg({
      people: org.people?.map((p) => (p.id === person.id ? person : p)) || [],
      orgId: orgId,
    });
  }

  // function editLevel(person: Level) {
  //   if (!orgId) return;
  //   updateLevelsFromOrg({
  //     levels: org.levels?.map((l) => (p.id === person.id ? person : p)) || [],
  //     orgId: orgId,
  //   });
  // }

  function deletePerson({ id }: Person) {
    if (!orgId) return;
    updatePeopleFromOrg({
      people: org.people?.filter((person) => person.id !== id) || [],
      orgId: orgId,
    });
  }

  function deleteRoom({ id }: Room) {
    if (!orgId) return;
    updateRoomsFromOrg({
      rooms: org.rooms?.filter((room) => room.id !== id) || [],
      orgId: orgId,
    });
  }

  function deleteLevel(level: Level) {
    if (!orgId) return;
    updateLevelsFromOrg({
      levels: org.levels?.filter((l) => level !== l) || [],
      orgId: orgId,
    });
  }

  return {
    org,
    rooms,
    levels,
    people,
    orgName,
    orgId,
    getNextId,
    addPerson,
    addRoom,
    deletePerson,
    deleteRoom,
    editRoom,
    editPerson,
    addLevel,
    // editLevel,
    deleteLevel,
  };
}
