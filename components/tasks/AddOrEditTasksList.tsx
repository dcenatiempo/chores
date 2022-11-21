import { FC, useCallback, useMemo, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Level, Room, Task } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import {
  Surface,
  SurfaceTemplate,
} from '../../libs/store/models/surfaces/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditTask from './AddOrEditTask';
import TaskListItem from './TaskListItem';

interface AddOrEditTasksListProps {
  tasks: Task[] | undefined;
  addTask?: (task: Task) => void;
  deleteTask?: (task: Task) => void;
  editTask?: (task: Task) => void;
}

const AddOrEditTasksList: FC<AddOrEditTasksListProps> = ({
  tasks = [],
  addTask,
  deleteTask,
  editTask,
}) => {
  const [taskId, setTaskId] = useState('');
  const [level, setLevel] = useState<Level>();
  const [room, setRoom] = useState<Room>();
  const [surface, setSurface] = useState<Surface>();
  const [roomType, setRoomType] = useState<RoomType>();
  const [surfaceTemplate, setSurfaceTemplate] = useState<SurfaceTemplate>();
  const [action, setAction] = useState<Action>();

  const [generic, setGeneric] = useState(true);

  function setForm(task?: Task) {
    setGeneric(!task?.room);
    setTaskId(task?.id || '');
    setLevel(task?.level);
    setRoom(task?.room);
    setSurface(task?.surface);
    setRoomType(task?.roomType);
    setSurfaceTemplate(task?.surfaceTemplate);
    setAction(task?.action);
  }

  function clearForm() {
    setTaskId('');
    setLevel(undefined);
    setRoom(undefined);
    setSurface(undefined);
    setRoomType(undefined);
    setSurfaceTemplate(undefined);
    setAction(undefined);
  }

  const isFormValid = useCallback(() => {
    if (generic) {
      if (!roomType) return false;
    } else {
      if (!room) return false;
    }

    if (!action) return false;
    return true;
  }, [generic, roomType, room, action]);

  function onClickAddOrSave(callback?: (task: Task) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      id: taskId,
      action,
      room,
      surface,
      roomType,
      surfaceTemplate,
    } as Task);
  }

  function _onClickAdd() {
    onClickAddOrSave(addTask);
  }
  function _onClickEdit() {
    onClickAddOrSave(editTask);
  }
  function _onClickDelete(task: Task) {
    deleteTask?.(task);
  }

  const disabled = !isFormValid();

  return (
    <AddOrEditList
      resources={tasks}
      onClickAdd={addTask ? _onClickAdd : undefined}
      onClickSave={editTask ? _onClickEdit : undefined}
      onClickDelete={deleteTask ? _onClickDelete : undefined}
      resourceName={'Task'}
      renderResource={(item) => <TaskListItem task={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditTask
          room={room}
          roomType={roomType}
          setRoomType={setRoomType}
          surfaceTemplate={surfaceTemplate}
          setSurfaceTemplate={setSurfaceTemplate}
          setRoom={setRoom}
          surface={surface}
          setSurface={setSurface}
          action={action}
          setAction={setAction}
          generic={generic}
          setGeneric={setGeneric}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditTasksList;
