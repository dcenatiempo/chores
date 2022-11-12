import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';
import AddOrEditChoresList from '../../components/chores/AddOrEditChoresList';
import RoomTypeSelector from '../../components/roomTypes/RoomTypeSelector';
import { useCallback, useMemo, useState } from 'react';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { Task } from '../../libs/store/models/orgs/types';

const Household: NextPage = () => {
  const {
    peopleArray,
    roomsArray,
    tasksArray,
    choresArray,
    addTask,
    deleteTask,
    editTask,
    addChore,
    deleteChore,
    editChore,
  } = useCurrentOrg();

  const [roomType, setRoomType] = useState<RoomType>();

  const uniqueRoomTypes = useMemo(() => {
    const obj = tasksArray.reduce<{ [roomType: string]: RoomType }>(
      (acc, t) => {
        const roomRoomTypeId = t.room?.roomType?.id;
        if (roomRoomTypeId && !acc[roomRoomTypeId]) {
          // @ts-expect-error
          acc[roomRoomTypeId] = t.room.roomType;
        }
        const roomTypeId = t.roomType?.id;
        if (roomTypeId && !acc[roomTypeId]) {
          // @ts-expect-error
          acc[roomTypeId] = t.roomType;
        }
        return { ...acc };
      },
      {}
    );
    return Object.values(obj);
  }, [tasksArray]);

  const showChores = !!tasksArray.length && !!peopleArray.length;
  const showTasks = !!roomsArray.length && !!peopleArray.length;

  const taskHasRoomType = useCallback(
    (t: Task) => {
      return roomType
        ? t?.roomType?.id === roomType?.id ||
            t?.room?.roomType?.id === roomType?.id
        : true;
    },
    [roomType]
  );

  const tasksToShow = useMemo(() => {
    return tasksArray.filter(taskHasRoomType);
  }, [taskHasRoomType, tasksArray]);

  const choresToShow = useMemo(() => {
    return choresArray.filter(
      (c) =>
        (roomType ? c?.room?.roomType?.id === roomType?.id : true) ||
        (roomType ? mapToArray(c?.tasks).some(taskHasRoomType) : true)
    );
  }, [taskHasRoomType, choresArray]);

  return (
    <PageWrapper metaTitle="Chore Household">
      <RoomTypeSelector
        onSelect={setRoomType}
        selected={roomType}
        roomTypes={uniqueRoomTypes}
      />
      {showChores ? (
        <AddOrEditChoresList
          chores={choresToShow}
          addChore={addChore}
          deleteChore={deleteChore}
          editChore={editChore}
        />
      ) : null}
      {showTasks ? (
        <AddOrEditTasksList
          tasks={tasksToShow}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ) : null}
    </PageWrapper>
  );
};

export default Household;
