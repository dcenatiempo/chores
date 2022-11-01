import { FC } from 'react';
import { Room } from '../../libs/store/slices/orgs/types';
import Card from '../base/Card';

export interface RoomsListProps {
  rooms: Room[] | undefined;
}

const RoomsList: FC<RoomsListProps> = ({ rooms = [] }) => {
  return (
    <Card>
      {rooms.map((room) => (
        <RoomRow key={room.id} room={room} />
      ))}
    </Card>
  );
};

export default RoomsList;

interface RoomRowProps {
  room: Room;
}
const RoomRow: FC<RoomRowProps> = ({ room }) => {
  return (
    <div>
      {room.name} ({room.type}) on the {room.level} level
    </div>
  );
};
