import { FC, useMemo, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Level, Room } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { SurfaceTemplate } from '../../libs/store/models/surfaces/types';
import ActionsSelector from '../actions/ActionsSelector';
import { Dropdown } from '../base';
import FilterRooms from '../filters/FilterRooms';
import { surfacesFromRooms } from '../filters/utils';

interface AddOrEditTaskProps {
  surfaceTemplate?: SurfaceTemplate;
  setSurfaceTemplate: (surfaceTemplate?: SurfaceTemplate) => void;
  action?: Action;
  setAction: (action?: Action) => void;
  initialLevel?: Level;
  initialRoom?: Room;
  initialRoomType?: RoomType;
}

const AddOrEditTask: FC<AddOrEditTaskProps> = ({
  surfaceTemplate,
  setSurfaceTemplate,
  action,
  setAction,
  initialLevel,
  initialRoom,
  initialRoomType,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const surfaceOptions = useMemo(() => surfacesFromRooms(rooms), [rooms]);

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
        <ActionsSelector selected={action} onSelect={setAction} />
        <Dropdown
          options={surfaceOptions}
          valueKey={(option) => option?.id || ''}
          labelKey={(option) => option?.name || ''}
          id={'surface'}
          onSelect={setSurfaceTemplate}
          selected={surfaceTemplate}
          label={'Surface'}
        />
      </div>
      <br />
    </>
  );
};

export default AddOrEditTask;
