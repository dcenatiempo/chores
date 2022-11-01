import { FC, useState } from 'react';
import { addRoomtoOrg } from '../../libs/firebase';
import { Room } from '../../libs/store/slices/orgs/types';
import useCurrentOrg from '../../libs/store/slices/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/slices/roomTypes/types';
import { Surface } from '../../libs/store/slices/surfaces/types';
import { toCamelCase } from '../../libs/utils';
import { Button, TextInput } from '../base';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import SurfaceSelector from '../surfaces/SurfaceSelector';

export interface AddRoomProps {}

const AddRoom: FC<AddRoomProps> = ({}) => {
  const [name, setName] = useState('');
  const { org } = useCurrentOrg();

  const [roomType, setRoomType] = useState<RoomType>();
  const [level, setLevel] = useState<string>();
  const [surfaces, setSurfaces] = useState<Surface[]>([]);

  function addSurface(surface: Surface | undefined) {
    if (!surface) return;
    setSurfaces([surface, ...surfaces]);
  }

  function removeSurface(i: number) {
    console.log(surfaces);
    console.log(i);
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
    console.log('ADD ROOM!');
    const newRoom: Room = {
      level,
      name,
      type: roomType.id,
      id: toCamelCase(name), // todo ensure this is unique
      surfaces: surfaces,
    };
    addRoomtoOrg({
      orgId: org.id,
      room: newRoom,
    });
    resetForm();
  }
  console.log(name, roomType, level, surfaces);

  return (
    <div style={{ borderWidth: 5, borderColor: 'white', borderStyle: 'solid' }}>
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
    </div>
  );
};

export default AddRoom;