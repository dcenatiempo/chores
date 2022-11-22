import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';
import AddOrEditChoresList from '../../components/chores/AddOrEditChoresList';
import { useMemo, useState } from 'react';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import { Level, Room } from '../../libs/store/models/orgs/types';
import FilterRooms from '../../components/filters/FilterRooms';
import { surfacesFromRooms } from '../../components/filters/utils';
import { RoomType } from '../../libs/store/models/roomTypes/types';

const Household: NextPage = () => {
  const {
    peopleArray,
    roomsArray,
    tasksArray,
    choresArray,
    addTaskTemplate,
    deleteTaskTemplate,
    editTaskTemplate,
    addChoreTemplate,
    deleteChoreTemplate,
    editChoreTemplate,
  } = useCurrentOrg();

  const [roomOptions, setRoomOptions] = useState<Room[]>([]);

  const showChores = !!tasksArray.length && !!peopleArray.length;
  const showTasks = !!roomsArray.length && !!peopleArray.length;

  const filteredSurfaces = useMemo(
    () => arrayToMap(surfacesFromRooms(roomOptions)),
    [roomOptions]
  );

  const tasksToShow = useMemo(() => {
    return tasksArray.filter((t) => !!filteredSurfaces[t.surfaceTemplate.id]);
  }, [filteredSurfaces, tasksArray]);

  const choresToShow = useMemo(() => {
    return choresArray.filter((c) =>
      // TODO some or every?
      Object.values(c.taskTemplates).some((ct) =>
        tasksToShow.find((t) => t.id === ct.id)
      )
    );
  }, [choresArray, tasksToShow]);

  const [initialLevel, setLevel] = useState<Level>();
  const [initialRoom, setRoom] = useState<Room>();
  const [initialRoomType, setRoomType] = useState<RoomType>();
  return (
    <PageWrapper metaTitle="Chore Household">
      <FilterRooms
        onRoomsChange={setRoomOptions}
        setLevel={setLevel}
        setRoom={setRoom}
        setRoomType={setRoomType}
      />
      {showChores ? (
        <AddOrEditChoresList
          choreTemplates={choresToShow}
          addChoreTemplate={addChoreTemplate}
          deleteChoreTemplate={deleteChoreTemplate}
          editChoreTemplate={editChoreTemplate}
          initialLevel={initialLevel}
          initialRoom={initialRoom}
          initialRoomType={initialRoomType}
        />
      ) : null}
      {showTasks ? (
        <AddOrEditTasksList
          taskTemplates={tasksToShow}
          addTaskTemplate={addTaskTemplate}
          deleteTaskTemplate={deleteTaskTemplate}
          editTaskTemplate={editTaskTemplate}
          initialLevel={initialLevel}
          initialRoom={initialRoom}
          initialRoomType={initialRoomType}
        />
      ) : null}
    </PageWrapper>
  );
};

export default Household;
