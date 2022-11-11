import { FC, useState } from 'react';
import { Level, Room } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import { Surface } from '../../libs/store/models/surfaces/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditRoom from './AddOrEditRoom';
import RoomListItem from './RoomListItem';

interface AddOrEditRoomsListProps {
  rooms: Room[] | undefined;
  addRoom?: (room: Room) => void;
  deleteRoom?: (room: Room) => void;
  editRoom?: (room: Room) => void;
}

const AddOrEditRoomsList: FC<AddOrEditRoomsListProps> = ({
  rooms = [],
  addRoom,
  deleteRoom,
  editRoom,
}) => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomType, setRoomType] = useState<RoomType | undefined>();
  const [level, setLevel] = useState<Level | undefined>();
  const [surfaces, setSurfaces] = useState<Surface[]>([]);

  const disabled = !isFormValid();

  function setForm(room?: Room) {
    setName(room?.name || '');
    setRoomId(room?.id || '');
    setRoomType(room?.roomType);
    setLevel(room?.level);
    setSurfaces(mapToArray(room?.surfaces));
  }

  function clearForm() {
    setName('');
    setRoomId('');
    setRoomType(undefined);
    setLevel(undefined);
    setSurfaces([]);
  }

  function isFormValid() {
    if (!name) return false;
    if (!roomType) return false;
    if (!level) return false;
    if (!surfaces.length) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (room: Room) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      level,
      name,
      roomType: roomType,
      id: roomId,
      surfaces: arrayToMap(surfaces),
    } as Room);
  }

  function _onClickAdd() {
    onClickAddOrSave(addRoom);
  }
  function _onClickEdit() {
    onClickAddOrSave(editRoom);
  }
  function _onClickDelete(room: Room) {
    deleteRoom?.(room);
  }
  return (
    <AddOrEditList
      resources={rooms}
      onClickAdd={addRoom ? _onClickAdd : undefined}
      onClickSave={editRoom ? _onClickEdit : undefined}
      onClickDelete={deleteRoom ? _onClickDelete : undefined}
      resourceName={'Room'}
      renderResource={(item) => <RoomListItem room={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditRoom
          name={name}
          setName={setName}
          level={level}
          setLevel={setLevel}
          surfaces={surfaces}
          setSurfaces={setSurfaces}
          roomType={roomType}
          setRoomType={setRoomType}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditRoomsList;
