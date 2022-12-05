import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { useSurfaces } from '../../libs/store/models/surfaces';

import { SurfaceTemplate } from '../../libs/store/models/surfaces/types';
import { TextInput } from '../base';
import Card from '../base/Card';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import RoomSurfaceSelector from '../surfaces/RoomSurfaceSelector';

export interface AddOrEditRoomProps {
  name: string;
  setName: (name: string) => void;
  level?: Level;
  setLevel: (level: Level | undefined) => void;
  surfaces: SurfaceTemplate[];
  setSurfaces: (surfaces: SurfaceTemplate[]) => void;
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
  const { surfaceTemplates } = useSurfaces();

  return (
    <>
      <br />
      <TextInput value={name} label="name" onChange={setName} />
      <br />
      <RoomTypeSelector
        selected={roomType}
        onSelect={(rt) => {
          if (!surfaces?.length) {
            const hydratedSurfaces: SurfaceTemplate[] = [];
            rt?.defaultSurfaces?.forEach((sId) => {
              const st = surfaceTemplates[sId];
              if (!st) return;
              hydratedSurfaces.push(st);
            });
            setSurfaces(hydratedSurfaces);
          }
          setRoomType(rt);
        }}
      />
      <br />
      <LevelSelector selected={level} onSelect={setLevel} />
      <br />
      <RoomSurfaceSelector
        selected={surfaces}
        onSelect={setSurfaces}
        detached={roomType?.name === 'none'}
      />
    </>
  );
};

export default AddOrEditRoom;
