import { FC, useMemo, useState } from 'react';
import { Room, Task } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { TextInput } from '../base';
import MultiselectDropdown from '../base/MultiselectDropdown';
import RoomSelector from '../rooms/RoomSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';

interface AddOrEditChoreProps {
  name: string;
  setName: (name: string) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  room?: Room;
  setRoom: (room?: Room) => void;
  roomType?: RoomType;
  setRoomType: (roomType?: RoomType) => void;
}

const AddOrEditChore: FC<AddOrEditChoreProps> = ({
  name,
  setName,
  tasks,
  setTasks,
  room,
  setRoom,
  roomType,
  setRoomType,
}) => {
  const { tasksArray, roomsArray } = useCurrentOrg();

  // TODO: clean this up - filter by room, or roomType
  const taskOptions = useMemo(() => {
    if (!room && !roomType) return tasksArray;
    return tasksArray.filter((t) => {
      const shouldShow =
        // generic tasks with roomType, that matches roomType
        (t?.roomType?.id && roomType?.id && t?.roomType?.id === roomType?.id) ||
        // generic tasks with room type, that matches room.roomType
        (t?.roomType?.id &&
          room?.roomType?.id &&
          t?.roomType?.id === room?.roomType?.id) ||
        // task with rooms that match roomType
        (t?.room?.roomType?.id &&
          roomType?.id &&
          t?.room?.roomType?.id === roomType?.id) ||
        // task with rooms that match room
        (t?.room?.id && room?.id && t?.room?.id === room?.id);

      return shouldShow;
    });
  }, [room, roomType, tasksArray]);

  const roomsOptions = useMemo(() => {
    return roomsArray.filter((r) => {
      return r.roomType.id === roomType?.id;
    });
  }, [roomsArray, roomType]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        columnGap: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <TextInput value={name} onChange={setName} label="Name" />
      <RoomTypeSelector selected={roomType} onSelect={setRoomType} />
      <RoomSelector onSelect={setRoom} selected={room} rooms={roomsOptions} />

      <MultiselectDropdown
        options={taskOptions}
        valueKey={(option) => option?.id || ''}
        labelKey={(option) =>
          `${option?.action.name || ''} ${
            option?.room?.name || option?.roomType?.name || ''
          } ${
            option?.surface?.name || option?.surfaceTemplate?.name || ''
          }`.trim()
        }
        id={'defaultPeople'}
        onSelect={setTasks}
        selected={tasks}
        label={'Tasks'}
      />
    </div>
  );
};

export default AddOrEditChore;
