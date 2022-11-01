import { FC } from 'react';
import { Room } from '../../libs/store/slices/orgs/types';

export interface RoomsListProps {
  rooms: Room[] | undefined;
}

const RoomsList: FC<RoomsListProps> = ({ rooms = [] }) => {
  return (
    <div>
      {rooms.map((room) => (
        <RoomRow key={room.id} room={room} />
      ))}
    </div>
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
