import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { DeleteButton, EditButton } from '../buttons';

interface RoomListItemProps {
  room: Room;
  onClickDelete?: (room: Room) => void;
}
const RoomListItem: FC<RoomListItemProps> = ({ room, onClickDelete }) => {
  function onClickDeleteRoom() {
    onClickDelete?.(room);
  }

  function onClickEditRoom() {
    console.log('edit person' + room.name);
  }
  return (
    <ListItem>
      {room.name} ({room.type}) on the {room.level} level
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        <EditButton disabled onClick={onClickEditRoom} />
        {onClickDelete ? <DeleteButton onClick={onClickDeleteRoom} /> : null}
      </div>
    </ListItem>
  );
};

export default RoomListItem;
