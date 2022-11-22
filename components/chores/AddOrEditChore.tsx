import { FC, useMemo, useState } from 'react';
import { Level, Room, TaskTemplate } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { arrayToMap } from '../../libs/store/models/sharedTransformers';
import { TextInput } from '../base';
import MultiselectDropdown from '../base/MultiselectDropdown';
import FilterRooms from '../filters/FilterRooms';
import { surfacesFromRooms } from '../filters/utils';

interface AddOrEditChoreProps {
  name: string;
  setName: (name: string) => void;
  tasks: TaskTemplate[];
  setTasks: (tasks: TaskTemplate[]) => void;
  initialLevel?: Level;
  initialRoom?: Room;
  initialRoomType?: RoomType;
}

const AddOrEditChore: FC<AddOrEditChoreProps> = ({
  name,
  setName,
  tasks,
  setTasks,
  initialLevel,
  initialRoom,
  initialRoomType,
}) => {
  const { tasksArray } = useCurrentOrg();
  const [roomOptions, setRooms] = useState<Room[]>([]);

  const filteredSurfaces = useMemo(
    () => arrayToMap(surfacesFromRooms(roomOptions)),
    [roomOptions]
  );

  const taskOptions = useMemo(() => {
    return tasksArray.filter((t) => !!filteredSurfaces[t.surfaceTemplate.id]);
  }, [filteredSurfaces, tasksArray]);

  return (
    <>
      <FilterRooms
        initialLevel={initialLevel}
        initialRoom={initialRoom}
        initialRoomType={initialRoomType}
        onRoomsChange={setRooms}
      />
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

        <MultiselectDropdown
          options={taskOptions}
          valueKey={(option) => option?.id || ''}
          labelKey={(option) =>
            `${option?.action.name} ${option?.surfaceTemplate?.name}`
          }
          id={'defaultPeople'}
          onSelect={setTasks}
          selected={tasks}
          label={'Tasks'}
        />
      </div>
    </>
  );
};

export default AddOrEditChore;
