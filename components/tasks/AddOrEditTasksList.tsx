import { FC, useCallback, useState } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import { Level, Room, TaskTemplate } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { SurfaceTemplate } from '../../libs/store/models/surfaces/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditTask from './AddOrEditTask';
import TaskListItem from './TaskListItem';

interface AddOrEditTasksListProps {
  taskTemplates: TaskTemplate[] | undefined;
  addTaskTemplate?: (taskTemplate: TaskTemplate) => void;
  deleteTaskTemplate?: (taskTemplate: TaskTemplate) => void;
  editTaskTemplate?: (taskTemplate: TaskTemplate) => void;
  initialLevel?: Level;
  initialRoom?: Room;
  initialRoomType?: RoomType;
}

const AddOrEditTasksList: FC<AddOrEditTasksListProps> = ({
  taskTemplates = [],
  addTaskTemplate,
  deleteTaskTemplate,
  editTaskTemplate,
  initialLevel,
  initialRoom,
  initialRoomType,
}) => {
  const [taskTemplateId, setTaskTemplateId] = useState('');
  const [surfaceTemplate, setSurfaceTemplate] = useState<SurfaceTemplate>();
  const [action, setAction] = useState<Action>();

  function setForm(taskTemplate?: TaskTemplate) {
    setTaskTemplateId(taskTemplate?.id || '');
    setSurfaceTemplate(taskTemplate?.surfaceTemplate);
    setAction(taskTemplate?.action);
  }

  function clearForm() {
    setTaskTemplateId('');
    setSurfaceTemplate(undefined);
    setAction(undefined);
  }

  const isFormValid = useCallback(() => {
    if (!action) return false;
    if (!surfaceTemplate) return false;
    return true;
  }, [surfaceTemplate, action]);

  function onClickAddOrSave(callback?: (task: TaskTemplate) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      id: taskTemplateId,
      action,
      surfaceTemplate,
    } as TaskTemplate);
  }

  function _onClickAdd() {
    onClickAddOrSave(addTaskTemplate);
  }
  function _onClickEdit() {
    onClickAddOrSave(editTaskTemplate);
  }
  function _onClickDelete(taskTemplate: TaskTemplate) {
    deleteTaskTemplate?.(taskTemplate);
  }

  const disabled = !isFormValid();

  return (
    <AddOrEditList
      resources={taskTemplates}
      onClickAdd={addTaskTemplate ? _onClickAdd : undefined}
      onClickSave={editTaskTemplate ? _onClickEdit : undefined}
      onClickDelete={deleteTaskTemplate ? _onClickDelete : undefined}
      resourceName={'Task'}
      renderResource={(item) => <TaskListItem task={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditTask
          surfaceTemplate={surfaceTemplate}
          setSurfaceTemplate={setSurfaceTemplate}
          action={action}
          setAction={setAction}
          initialLevel={initialLevel}
          initialRoom={initialRoom}
          initialRoomType={initialRoomType}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditTasksList;
