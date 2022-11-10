import { FC, useMemo, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Room, Task } from '../../libs/store/models/orgs/types';
import { Surface } from '../../libs/store/models/surfaces/types';
import ActionsSelector from '../actions/ActionsSelector';
import { Dropdown } from '../base';
import { AddOrEditResourceProps } from '../base/AddOrEditList';
import { AddButton } from '../buttons';
import RoomSelector from '../rooms/RoomSelector';

interface AddOrEditTaskProps extends AddOrEditResourceProps<Task> {}

const AddOrEditTask: FC<AddOrEditTaskProps> = ({
  initialResource,
  onSubmitResource,
}) => {
  const taskId = initialResource?.id || '';

  const [room, setRoom] = useState<Room>();
  const roomSurfaces = useMemo(
    () => Object.values(room?.surfaces || {}),
    [room?.surfaces]
  );
  const [surface, setSurface] = useState<Surface>(); //initialResource?.surfaceId ? { id: initialResource?.surfaceId } : undefined
  const [action, setAction] = useState<Action>();

  function onClickAddTask() {
    if (!room || !surface || !action) return;
    setRoom(undefined);
    setSurface(undefined);
    setAction(undefined);
    onSubmitResource({
      action: action,
      room: room,
      surface: surface,
      id: taskId,
    });
  }

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
      <AddButton onClick={onClickAddTask} />
    </div>
  );
};

export default AddOrEditTask;
