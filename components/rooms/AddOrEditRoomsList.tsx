import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditRoom from './AddOrEditRoom';
import RoomListItem from './RoomListItem';

interface AddOrEditRoomsListProps {
  rooms: Room[] | undefined;
  onClickAdd: (room: Room) => void;
  onClickDelete: (room: Room) => void;
  onClickEdit: (room: Room) => void;
}

const AddOrEditRoomsList: FC<AddOrEditRoomsListProps> = ({
  rooms = [],
  onClickAdd,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <AddOrEditList
      resources={rooms}
      addResource={onClickAdd}
      deleteResource={onClickDelete}
      editResource={onClickEdit}
      resourceName={'Rooms'}
      renderResource={(item) => <RoomListItem room={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      AddOrEditResource={AddOrEditRoom}
    />
  );
};

export default AddOrEditRoomsList;
