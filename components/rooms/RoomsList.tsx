import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import List from '../base/List';
import RoomListItem from './RoomListItem';

export interface RoomsListProps {
  rooms: Room[] | undefined;
}

const RoomsList: FC<RoomsListProps> = ({ rooms = [] }) => {
  return (
    <List
      items={rooms}
      keyExtractor={(item) => `${item.id}`}
      renderItem={(item) => <RoomListItem room={item} />}
    />
  );
};

export default RoomsList;
