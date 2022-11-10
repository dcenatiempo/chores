import { FC, useMemo } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Room } from '../../libs/store/models/orgs/types';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { Surface } from '../../libs/store/models/surfaces/types';
import ActionsSelector from '../actions/ActionsSelector';
import { Dropdown } from '../base';
import RoomSelector from '../rooms/RoomSelector';

interface AddOrEditTaskProps {
  room?: Room;
  setRoom: (room?: Room) => void;
  surface?: Surface;
  setSurface: (surface?: Surface) => void;
  action?: Action;
  setAction: (action?: Action) => void;
}

const AddOrEditTask: FC<AddOrEditTaskProps> = ({
  room,
  setRoom,
  surface,
  setSurface,
  action,
  setAction,
}) => {
  const roomSurfaces = useMemo(
    () => mapToArray(room?.surfaces),
    [room?.surfaces]
  );

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
      <RoomSelector selected={room} onSelect={setRoom} />
      <Dropdown
        options={roomSurfaces}
        valueKey={(option) => option?.id || ''}
        labelKey={(option) =>
          `${option?.name || ''} ${option?.descriptor || ''}`.trim()
        }
        id={'surface'}
        onSelect={setSurface}
        selected={surface}
        label={'Surface'}
      />
      <ActionsSelector selected={action} onSelect={setAction} />
    </div>
  );
};

export default AddOrEditTask;
