import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLevelToOrg,
  addPersonToOrg,
  addRoomToOrg,
  addTaskToOrg,
  updateLevelsFromOrg,
  updatePeopleFromOrg,
  updateRoomsFromOrg,
  updateTasksFromOrg,
} from '../../../firebase';
import { incrementHex } from '../../../utils';
import { actions } from './reducer';
import * as selectors from './selectors';
import { Level, Person, Room, Task } from './types';

export default function useCurrentOrg() {
  const dispatch = useDispatch();
  const rooms = useSelector(selectors.rooms);
  const people = useSelector(selectors.people);
  const orgName = useSelector(selectors.name);
  const orgId = useSelector(selectors.id);
  const levels = useSelector(selectors.levels);
  const lastId = useSelector(selectors.lastId);
  const tasks = useSelector(selectors.tasks);
  const customRoomTypes = useSelector(selectors.customRoomTypes);
  const customSurfaces = useSelector(selectors.customSurfaces);
  const lastIdRef = useRef(lastId);

  function getNextId() {
    if (!lastIdRef.current) lastIdRef.current = lastId;
    const newLastId = incrementHex(lastIdRef.current);
    lastIdRef.current = newLastId;
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
    addRoomToOrg({
      orgId: orgId,
      room: {
        ...room,
        surfaces: room.surfaces.map((s) => ({
          ...s,
          id: getNextId(),
        })),
        id: getNextId(),
      },
    });
  }

  function addTask(task: Task) {
    if (!orgId) return;
    addTaskToOrg({
      orgId: orgId,
      task: { ...task, id: getNextId() },
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
      rooms: rooms?.map((r) => (r.id === room.id ? room : r)) || [],
      orgId: orgId,
    });
  }

  function editTask(task: Task) {
    if (!orgId) return;
    updateTasksFromOrg({
      tasks: tasks?.map((t) => (t.id === task.id ? task : t)) || [],
      orgId: orgId,
    });
  }

  function editPerson(person: Person) {
    if (!orgId) return;
    updatePeopleFromOrg({
      people: people?.map((p) => (p.id === person.id ? person : p)) || [],
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
      people: people?.filter((person) => person.id !== id) || [],
      orgId: orgId,
    });
  }

  function deleteRoom({ id }: Room) {
    if (!orgId) return;
    updateRoomsFromOrg({
      rooms: rooms?.filter((room) => room.id !== id) || [],
      orgId: orgId,
    });
  }

  function deleteTask({ id }: Task) {
    if (!orgId) return;
    updateTasksFromOrg({
      tasks: tasks?.filter((task) => task.id !== id) || [],
      orgId: orgId,
    });
  }

  function deleteLevel(level: Level) {
    if (!orgId) return;
    updateLevelsFromOrg({
      levels: levels?.filter((l) => level !== l) || [],
      orgId: orgId,
    });
  }

  return {
    tasks,
    rooms,
    levels,
    people,
    orgName,
    orgId,
    customRoomTypes,
    customSurfaces,
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
    addTask,
    deleteTask,
    editTask,
  };
}
