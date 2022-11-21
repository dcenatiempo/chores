import { FC, useState } from 'react';
import { getChoreRoomTypes } from '../../libs/store/models/orgs/transformers';
import { Chore, Person, Room, Task } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
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
  const [name, setName] = useState('');

  const [room, setRoom] = useState<Room>();
  const [roomType, setRoomType] = useState<RoomType>();

  const disabled = !isFormValid();

  function setForm(chore?: Chore) {
    const roomTypes = mapToArray(getChoreRoomTypes(chore));
    const rt = roomTypes.length === 1 ? roomTypes[0] : undefined;
    setChoreId(chore?.id || '');
    setTasks(mapToArray(chore?.tasks));
    setName(chore?.name || '');
    setRoom(chore?.room);
    setRoomType(rt);
  }

  function clearForm() {
    setTasks([]);
    setName('');
    setChoreId('');
    setRoom(undefined);
    setRoomType(undefined);
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
          tasks={tasks}
          setTasks={setTasks}
          room={room}
          setRoom={setRoom}
          roomType={roomType}
          setRoomType={setRoomType}
        />
      }
      setResourceToEdit={setForm}
      disabled={disabled}
    />
  );
};

export default AddOrEditChoresList;
