import { useEffect, useMemo, useRef } from 'react';
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
import { mapToArray } from '../sharedTransformers';
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
  const tasks = useSelector(selectors.tasks);
  const chores = useSelector(selectors.chores);
  const customRoomTypes = useSelector(selectors.customRoomTypes);
  const customSurfaces = useSelector(selectors.customSurfaces);
  const choresArray = useSelector(selectors.choresArray);
  const peopleArray = useSelector(selectors.peopleArray);
  const roomsArray = useSelector(selectors.roomsArray);
  const tasksArray = useSelector(selectors.tasksArray);
  const levelsArray = useSelector(selectors.levelsArray);
  const roomsGroupedByLevel = useSelector(selectors.roomsGroupedByLevel);
  const roomsGroupedByRoomType = useSelector(selectors.roomsGroupedByRoomType);
  const customRoomTypesArray = useMemo(
    () => mapToArray(customRoomTypes),
    [customRoomTypes]
  );
  const customSurfacesArray = useMemo(
    () => mapToArray(customSurfaces),
    [customSurfaces]
  );

  const lastId = useSelector(selectors.lastId);
  const lastIdRef = useRef(lastId);
  useEffect(() => {
    if (lastId > lastIdRef.current) lastIdRef.current = lastId;
  }, [lastId]);

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
      entity: { ...person, id: getNextId() },
      orgId: orgId,
    });
  }

  function addRoom(room: Room) {
    if (!orgId) return;

    addRoomToOrg({
      orgId: orgId,
      entity: {
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
      entity: { ...task, id: getNextId() },
    });
  }

  function addChore(chore: Chore) {
    if (!orgId) return;
    addChoreToOrg({
      orgId: orgId,
      entity: { ...chore, id: getNextId() },
    });
  }

  function addLevel(level: Level) {
    if (!orgId) return;
    addLevelToOrg({
      orgId,
      entity: { ...level, id: getNextId() },
    });
  }

  function editRoom(room: Room) {
    if (!orgId) return;
    const roomsCopy = { ...rooms };
    roomsCopy[room.id] = room;
    updateRoomsFromOrg({
      entities: roomsCopy,
      orgId,
    });
  }

  function editTask(task: Task) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    tasksCopy[task.id] = task;
    updateTasksFromOrg({
      entities: tasksCopy,
      orgId,
    });
  }

  function editChore(chore: Chore) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    choresCopy[chore.id] = chore;
    updateChoresFromOrg({
      entities: choresCopy,
      orgId,
    });
  }

  function editPerson(person: Person) {
    if (!orgId) return;
    const peopleCopy = { ...people };
    peopleCopy[person.id] = person;
    updatePeopleFromOrg({
      entities: peopleCopy,
      orgId,
    });
  }

  function editLevel(level: Level) {
    if (!orgId) return;
    const levelsCopy = { ...levels };
    levelsCopy[level.id] = level;
    updateLevelsFromOrg({
      entities: levelsCopy,
      orgId,
    });
  }

  function deletePerson({ id }: Person) {
    if (!orgId) return;
    const peopleCopy = { ...people };
    delete peopleCopy[id];
    updatePeopleFromOrg({
      entities: peopleCopy,
      orgId,
    });
  }

  function deleteRoom({ id }: Room) {
    if (!orgId) return;
    const roomsCopy = { ...rooms };
    delete roomsCopy[id];
    updateRoomsFromOrg({
      entities: roomsCopy,
      orgId,
    });
  }

  function deleteTask({ id }: Task) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    delete tasksCopy[id];
    updateTasksFromOrg({
      entities: tasksCopy,
      orgId,
    });
  }

  function deleteChore({ id }: Chore) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    delete choresCopy[id];
    updateChoresFromOrg({
      entities: choresCopy,
      orgId,
    });
  }

  function deleteLevel({ id }: Level) {
    if (!orgId) return;
    const levelsCopy = { ...levels };
    delete levelsCopy[id];
    updateLevelsFromOrg({
      entities: levelsCopy,
      orgId,
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
    roomsGroupedByLevel,
    roomsGroupedByRoomType,
  };
}
