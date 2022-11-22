import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChoreTemplateToOrg,
  addLevelToOrg,
  addPersonToOrg,
  addRoomToOrg,
  addTaskTemplateToOrg,
  updateChoreTemplatesFromOrg,
  updateLevelsFromOrg,
  updatePeopleFromOrg,
  updateRoomsFromOrg,
  updateTaskTemplatesFromOrg,
} from '../../../firebase';
import { incrementHex } from '../../../utils';
import { mapToArray } from '../sharedTransformers';
// import { Map } from '../types';
import { actions } from './reducer';
import * as selectors from './selectors';
import { ChoreTemplate, Level, Person, Room, TaskTemplate } from './types';

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
  const roomTypesGroupedByLevel = useSelector(
    selectors.roomTypesGroupedByLevel
  );

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

  function addTaskTemplate(task: TaskTemplate) {
    if (!orgId) return;
    addTaskTemplateToOrg({
      orgId: orgId,
      entity: { ...task, id: getNextId() },
    });
  }

  function addChoreTemplate(chore: ChoreTemplate) {
    if (!orgId) return;
    addChoreTemplateToOrg({
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

  function editTaskTemplate(task: TaskTemplate) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    tasksCopy[task.id] = task;
    updateTaskTemplatesFromOrg({
      entities: tasksCopy,
      orgId,
    });
  }

  function editChoreTemplate(chore: ChoreTemplate) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    choresCopy[chore.id] = chore;
    updateChoreTemplatesFromOrg({
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

  function deleteTaskTemplate({ id }: TaskTemplate) {
    if (!orgId) return;
    const tasksCopy = { ...tasks };
    delete tasksCopy[id];
    updateTaskTemplatesFromOrg({
      entities: tasksCopy,
      orgId,
    });
  }

  function deleteChoreTemplate({ id }: ChoreTemplate) {
    if (!orgId) return;
    const choresCopy = { ...chores };
    delete choresCopy[id];
    updateChoreTemplatesFromOrg({
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

  const levelsInUse = useSelector(selectors.levelsInUse);
  const surfacesInUse = useSelector(selectors.surfacesInUse);
  const roomTypesInUse = useSelector(selectors.roomTypesInUse);

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
    addTaskTemplate,
    deleteTaskTemplate,
    editTaskTemplate,
    addChoreTemplate,
    deleteChoreTemplate,
    editChoreTemplate,
    roomsGroupedByLevel,
    roomsGroupedByRoomType,
    roomTypesGroupedByLevel,
    levelsInUse,
    roomTypesInUse,
    surfacesInUse,
  };
}
