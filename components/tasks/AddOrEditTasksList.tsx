import { FC, useMemo, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Room, Task } from '../../libs/store/models/orgs/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import { Surface } from '../../libs/store/models/surfaces/types';
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
  const [room, setRoom] = useState<Room | undefined>();
  const [surface, setSurface] = useState<Surface | undefined>();
  const [action, setAction] = useState<Action | undefined>();

  const disabled = !isFormValid();

  function setForm(task?: Task) {
    setTaskId(task?.id || '');
    setRoom(task?.room);
    setSurface(task?.surface);
    setAction(task?.action);
  }

  function clearForm() {
    setTaskId('');
    setRoom(undefined);
    setSurface(undefined);
    setAction(undefined);
  }

  function isFormValid() {
    if (!surface) return false;
    if (!room) return false;
    if (!action) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (task: Task) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      id: taskId,
      action,
      room,
      surface,
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
          setRoom={setRoom}
          surface={surface}
          setSurface={setSurface}
          action={action}
          setAction={setAction}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditTasksList;
