import { FC, useState } from 'react';
import { Room } from '../../libs/store/slices/orgs/types';
import useCurrentOrg from '../../libs/store/slices/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/slices/roomTypes/types';
import { TextInput } from '../base';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';

export interface AddRoomProps {}

const AddRoom: FC<AddRoomProps> = ({}) => {
  const [name, setName] = useState('');
  const { org } = useCurrentOrg();

  const [roomType, setRoomType] = useState<RoomType>();
  const [level, setLevel] = useState<string>();

  return (
    <div style={{ borderWidth: 5, borderColor: 'white', borderStyle: 'solid' }}>
      ADD ROOM
      <br />
      <TextInput value={name} label="name" onChange={setName} />
      RoomType
      <RoomTypeSelector selected={roomType} onSelect={setRoomType} />
      LEVEL
      <LevelSelector selected={level} onSelect={setLevel} />
      <br />
      SURFACES
    </div>
  );
};

export default AddRoom;
