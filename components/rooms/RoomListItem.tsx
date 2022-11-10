import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { DeleteButton, EditButton } from '../buttons';

interface RoomListItemProps {
  room: Room;
  onClickDelete?: (room: Room) => void;
  onClickEdit?: (room: Room) => void;
}
const RoomListItem: FC<RoomListItemProps> = ({
  room,
  onClickDelete,
  onClickEdit,
}) => {
  function onClickDeleteRoom() {
    onClickDelete?.(room);
  }

  function onClickEditRoom() {
    onClickEdit?.(room);
  }

  return (
    <ListItem>
      <>
        {' '}
        {/* {room.name} ({room.roomType?.name}) on the {room.level} level{' '} */}
        {/* {room.surfaces.length} surfaces */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
          }}
        >
          {onClickEdit ? <EditButton onClick={onClickEditRoom} /> : null}
          {onClickDelete ? <DeleteButton onClick={onClickDeleteRoom} /> : null}
        </div>
      </>
    </ListItem>
  );
};

export default RoomListItem;
