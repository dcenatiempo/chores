import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChoreToOrg,
  addLevelToOrg,
  addPersonToOrg,
  addRoomToOrg,
  addTaskToOrg,
  updateChoresFromOrg,
  updateLevelsFromOrg,
  updatePeopleFromOrg,
  updateRoomsFromOrg,
  updateTasksFromOrg,
} from '../../../firebase';
import { incrementHex } from '../../../utils';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import { Chore, Level, Person, Room, Task } from './types';

export default function useCurrentOrg() {
  const dispatch = useDispatch();
  const rooms = useSelector(selectors.rooms);
  const people = useSelector(selectors.people);
  const orgName = useSelector(selectors.name);
  const orgId = useSelector(selectors.id);
  const levels = useSelector(selectors.levels);
  const lastId = useSelector(selectors.lastId);
  const tasks = useSelector(selectors.tasks);
  const chores = useSelector(selectors.chores);
  const customRoomTypes = useSelector(selectors.customRoomTypes);
  const customSurfaces = useSelector(selectors.customSurfaces);
  const lastIdRef = useRef(lastId);
  const choresArray = useMemo(() => Object.values(chores), [chores]);
  const peopleArray = useMemo(() => Object.values(people), [people]);
  const roomsArray = useMemo(() => Object.values(rooms), [rooms]);
  const tasksArray = useMemo(() => Object.values(tasks), [tasks]);
  const levelsArray = useMemo(() => Object.values(levels), [levels]);
  const customRoomTypesArray = useMemo(
    () => Object.values(customRoomTypes),
    [customRoomTypes]
  );
  const customSurfacesArray = useMemo(
    () => Object.values(customSurfaces),
    [customSurfaces]
  );

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
        surfaces: room.surfaces,
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

  function addChore(chore: Chore) {
    if (!orgId) return;
    addChoreToOrg({
      orgId: orgId,
      chore: { ...chore, id: getNextId() },
    });
  }

  function addLevel(level: Level) {
    if (!orgId) return;
    addLevelToOrg({
      orgId,
      level: { ...level, id: getNextId() },
    });
  }

  function editRoom(room: Room) {
    if (!orgId) return;
    const roomsCopy = { ...rooms };
    roomsCopy[room.id] = room;
    updateRoomsFromOrg({
      rooms: roomsCopy,
      orgId,
    });
  }

  function editTask(task: Task) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    tasksCopy[task.id] = task;
    updateTasksFromOrg({
      tasks: tasksCopy,
      orgId,
    });
  }

  function editChore(chore: Chore) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    choresCopy[chore.id] = chore;
    updateChoresFromOrg({
      chores: choresCopy,
      orgId,
    });
  }

  function editPerson(person: Person) {
    if (!orgId) return;
    const peopleCopy = { ...people };
    peopleCopy[person.id] = person;
    updatePeopleFromOrg({
      people: peopleCopy,
      orgId,
    });
  }

  function editLevel(level: Level) {
    if (!orgId) return;
    const levelsCopy = { ...levels };
    levelsCopy[level.id] = level;
    updateLevelsFromOrg({
      levels: levelsCopy,
      orgId,
    });
  }

  function deletePerson({ id }: Person) {
    if (!orgId) return;
    const peopleCopy = { ...people };
    delete peopleCopy[id];
    updatePeopleFromOrg({
      people: peopleCopy,
      orgId: orgId,
    });
  }

  function deleteRoom({ id }: Room) {
    if (!orgId) return;
    const roomsCopy = { ...rooms };
    delete roomsCopy[id];
    updateRoomsFromOrg({
      rooms: roomsCopy,
      orgId: orgId,
    });
  }

  function deleteTask({ id }: Task) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    delete tasksCopy[id];
    updateTasksFromOrg({
      tasks: tasksCopy,
      orgId: orgId,
    });
  }

  function deleteChore({ id }: Chore) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    delete choresCopy[id];
    updateChoresFromOrg({
      chores: choresCopy,
      orgId: orgId,
    });
  }

  function deleteLevel({ id }: Level) {
    debugger;
    if (!orgId) return;
    const levelsCopy = { ...levels };
    delete levelsCopy[id];
    updateLevelsFromOrg({
      levels: levelsCopy,
      orgId: orgId,
    });
  }

  return {
    peopleArray,
    roomsArray,
    tasksArray,
    choresArray,
    levelsArray,
    customSurfacesArray,
    customRoomTypesArray,
    chores,
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
    editLevel,
    deleteLevel,
    addTask,
    deleteTask,
    editTask,
    addChore,
    deleteChore,
    editChore,
  };
}
