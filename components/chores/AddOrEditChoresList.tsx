import { FC, useState } from 'react';
import {
  ChoreTemplate,
  Level,
  Room,
  TaskTemplate,
} from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditChore from './AddOrEditChore';
import ChoreListItem from './ChoreListItem';

interface AddOrEditChoresListProps {
  choreTemplates: ChoreTemplate[] | undefined;
  addChoreTemplate?: (chore: ChoreTemplate) => void;
  editChoreTemplate?: (chore: ChoreTemplate) => void;
  deleteChoreTemplate?: (chore: ChoreTemplate) => void;
  initialLevel?: Level;
  initialRoom?: Room;
  initialRoomType?: RoomType;
}

const AddOrEditChoresList: FC<AddOrEditChoresListProps> = ({
  choreTemplates = [],
  addChoreTemplate,
  editChoreTemplate,
  deleteChoreTemplate,
  initialLevel,
  initialRoom,
  initialRoomType,
}) => {
  const [choreId, setChoreId] = useState('');
  const [tasks, setTasks] = useState<TaskTemplate[]>([]);
  const [name, setName] = useState('');

  const disabled = !isFormValid();

  function setForm(chore?: ChoreTemplate) {
    setChoreId(chore?.id || '');
    setTasks(mapToArray(chore?.taskTemplates));
    setName(chore?.name || '');
    console.log('xxx', chore);
  }

  function clearForm() {
    setTasks([]);
    setName('');
    setChoreId('');
  }
  function isFormValid() {
    if (!tasks.length) return false;
    if (!name) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (chore: ChoreTemplate) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      name,
      taskTemplates: arrayToMap(tasks),
      id: choreId,
    });
  }
  function _onClickAdd() {
    onClickAddOrSave(addChoreTemplate);
  }
  function _onClickEdit() {
    onClickAddOrSave(editChoreTemplate);
  }
  function _onClickDelete(chore: ChoreTemplate) {
    deleteChoreTemplate?.(chore);
  }

  return (
    <AddOrEditList
      resources={choreTemplates}
      onClickAdd={addChoreTemplate ? _onClickAdd : undefined}
      onClickSave={editChoreTemplate ? _onClickEdit : undefined}
      onClickDelete={deleteChoreTemplate ? _onClickDelete : undefined}
      resourceName={'Chore'}
      renderResource={(item) => <ChoreListItem chore={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      addOrEditResource={
        <AddOrEditChore
          name={name}
          setName={setName}
          tasks={tasks}
          setTasks={setTasks}
          initialLevel={initialLevel}
          initialRoom={initialRoom}
          initialRoomType={initialRoomType}
        />
      }
      setResourceToEdit={setForm}
      disabled={disabled}
    />
  );
};

export default AddOrEditChoresList;
