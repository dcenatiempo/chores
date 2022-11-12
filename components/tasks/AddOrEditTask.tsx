import { FC, useMemo, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Room } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { useSurfaces } from '../../libs/store/models/surfaces';
import {
  Surface,
  SurfaceTemplate,
} from '../../libs/store/models/surfaces/types';
import ActionsSelector from '../actions/ActionsSelector';
import { Dropdown, Switch } from '../base';
import RoomSelector from '../rooms/RoomSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import SurfaceTemplateSelector from '../surfaces/SurfaceTemplateSelector';

interface AddOrEditTaskProps {
  roomType?: RoomType;
  setRoomType: (roomType?: RoomType) => void;
  surfaceTemplate?: SurfaceTemplate;
  setSurfaceTemplate: (surfaceTemplate?: SurfaceTemplate) => void;
  room?: Room;
  setRoom: (room?: Room) => void;
  surface?: Surface;
  setSurface: (surface?: Surface) => void;
  action?: Action;
  setAction: (action?: Action) => void;
  generic: boolean;
  setGeneric: (generic: boolean) => void;
}

const AddOrEditTask: FC<AddOrEditTaskProps> = ({
  roomType,
  setRoomType,
  room,
  setRoom,
  surface,
  setSurface,
  surfaceTemplate,
  setSurfaceTemplate,
  action,
  setAction,
  generic,
  setGeneric,
}) => {
  const roomSurfaces = useMemo(
    () => mapToArray(room?.surfaces),
    [room?.surfaces]
  );

  const { surfaceTemplatesArray } = useSurfaces();

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
      <Switch value={generic} onChange={setGeneric} />
      {generic ? (
        <RoomTypeSelector selected={roomType} onSelect={setRoomType} />
      ) : (
        <RoomSelector selected={room} onSelect={setRoom} />
      )}
      {generic ? (
        <Dropdown
          options={surfaceTemplatesArray}
          valueKey={(option) => option?.id || ''}
          labelKey={(option) => option?.name || ''}
          id={'surface'}
          onSelect={setSurfaceTemplate}
          selected={surfaceTemplate}
          label={'Surface'}
        />
      ) : (
        <Dropdown
          options={roomSurfaces}
          valueKey={(option) => option?.id || ''}
          labelKey={(option) => option?.name || ''}
          id={'surface'}
          onSelect={setSurface}
          selected={surface}
          label={'Surface'}
        />
      )}
      <ActionsSelector selected={action} onSelect={setAction} />
    </div>
  );
};

export default AddOrEditTask;
