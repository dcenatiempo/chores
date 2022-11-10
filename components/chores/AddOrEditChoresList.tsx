import { FC, useState } from 'react';
import { Chore, Person, Task } from '../../libs/store/models/orgs/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditChore from './AddOrEditChore';
import ChoreListItem from './ChoreListItem';

interface AddOrEditChoresListProps {
  chores: Chore[] | undefined;
  addChore?: (chore: Chore) => void;
  editChore?: (chore: Chore) => void;
  deleteChore?: (chore: Chore) => void;
}

const AddOrEditChoresList: FC<AddOrEditChoresListProps> = ({
  chores = [],
  addChore,
  editChore,
  deleteChore,
}) => {
  const [choreId, setChoreId] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState('');

  const disabled = !isFormValid();

  function setForm(chore?: Chore) {
    setChoreId(chore?.id || '');
    setTasks(mapToArray(chore?.tasks));
    setPeople(mapToArray(chore?.defaultPeople));
    setName(chore?.name || '');
  }

  function clearForm() {
    setTasks([]);
    setPeople([]);
    setName('');
    setChoreId('');
  }
  function isFormValid() {
    if (!tasks.length) return false;
    if (!name) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (chore: Chore) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      name,
      defaultPeople: arrayToMap(people),
      tasks: arrayToMap(tasks),
      id: choreId,
    });
  }
  function _onClickAdd() {
    onClickAddOrSave(addChore);
  }
  function _onClickEdit() {
    onClickAddOrSave(editChore);
  }
  function _onClickDelete(chore: Chore) {
    deleteChore?.(chore);
  }

  return (
    <AddOrEditList
      resources={chores}
      onClickAdd={addChore ? _onClickAdd : undefined}
      onClickSave={editChore ? _onClickEdit : undefined}
      onClickDelete={deleteChore ? _onClickDelete : undefined}
      resourceName={'Chore'}
      renderResource={(item) => <ChoreListItem chore={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      addOrEditResource={
        <AddOrEditChore
          name={name}
          setName={setName}
          people={people}
          setPeople={setPeople}
          tasks={tasks}
          setTasks={setTasks}
        />
      }
      setResourceToEdit={setForm}
      disabled={disabled}
    />
  );
};

export default AddOrEditChoresList;
