import { FC, useState } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { Surface } from '../../libs/store/models/surfaces/types';
import { Button, TextInput } from '../base';
import Card from '../base/Card';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import SurfaceSelector from '../surfaces/SurfaceSelector';

export interface AddRoomProps {
  onAddRoom: (room: Room) => void;
}

const AddRoom: FC<AddRoomProps> = ({ onAddRoom }) => {
  const [name, setName] = useState('');

  const [roomType, setRoomType] = useState<RoomType>();
  const [level, setLevel] = useState<string>();
  const [surfaces, setSurfaces] = useState<Surface[]>([]);

  function addSurface(surface: Surface | undefined) {
    if (!surface) return;
    setSurfaces([surface, ...surfaces]);
  }

  function removeSurface(i: number) {
    surfaces.splice(i, 1);
    setSurfaces([...surfaces]);
  }

  const disabled = !(name && roomType && level && surfaces.length);

  function resetForm() {
    setName('');
    setSurfaces([]);
  }
  function onClickAddRoom() {
    if (disabled) return;
    const newRoom: Room = {
      level,
      name,
      type: roomType.id,
      id: '',
      surfaces: surfaces,
    };
    resetForm();
    onAddRoom(newRoom);
  }

  return (
    <Card>
      ADD ROOM
      <br />
      <TextInput value={name} label="name" onChange={setName} />
      <br />
      <RoomTypeSelector selected={roomType} onSelect={setRoomType} />
      <br />
      <LevelSelector selected={level} onSelect={setLevel} />
      <br />
      {surfaces.map((surface, i) => (
        <div key={`${i}`}>
          <>
            {surface.name} {surface.descriptor}
            <Button label="-" onClick={() => removeSurface(i)} />
          </>
        </div>
      ))}
      <SurfaceSelector onSelect={addSurface} />
      <Button label="Add Room" disabled={disabled} onClick={onClickAddRoom} />
    </Card>
  );
};

export default AddRoom;
