import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';

import { Surface } from '../../libs/store/models/surfaces/types';
import { IconButton, IconName, TextInput } from '../base';
import Card from '../base/Card';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import SurfaceSelector from '../surfaces/SurfaceSelector';

export interface AddOrEditRoomProps {
  name: string;
  setName: (name: string) => void;
  level?: Level;
  setLevel: (level: Level | undefined) => void;
  surfaces: Surface[];
  setSurfaces: (surfaces: Surface[]) => void;
  roomType?: RoomType;
  setRoomType: (roomType: RoomType | undefined) => void;
}

const AddOrEditRoom: FC<AddOrEditRoomProps> = ({
  name,
  setName,
  level,
  setLevel,
  surfaces,
  setSurfaces,
  roomType,
  setRoomType,
}) => {
  function addSurface(surface: Surface | undefined) {
    if (!surface) return;
    setSurfaces([surface, ...surfaces]);
  }

  function removeSurface(index: number) {
    const newSurfaces = surfaces.filter((_, i) => i !== index);
    setSurfaces(newSurfaces);
  }

  return (
    <Card>
      <br />
      <TextInput value={name} label="name" onChange={setName} />
      <br />
      <RoomTypeSelector selected={roomType} onSelect={setRoomType} />
      <br />
      <LevelSelector selected={level} onSelect={setLevel} />
      <br />
      <SurfaceSelector onSelect={addSurface} excluding={surfaces} />

      {surfaces.map((surface, i) => (
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
          }}
          key={`${surface.surfaceTemplate.id}-${surface.id}-${surface.descriptor}`}
        >
          {surface.name} {surface.descriptor ? `(${surface.descriptor})` : ''}
          <IconButton
            onClick={() => removeSurface(i)}
            iconName={IconName.MINUS}
            type="sentance"
          />
        </div>
      ))}
    </Card>
  );
};

export default AddOrEditRoom;
