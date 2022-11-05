import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';

interface RoomListItemProps {
  room: Room;
}
const RoomListItem: FC<RoomListItemProps> = ({ room }) => {
  return (
    <ListItem>
      {room.name} ({room.type}) on the {room.level} level
    </ListItem>
  );
};

export default RoomListItem;
