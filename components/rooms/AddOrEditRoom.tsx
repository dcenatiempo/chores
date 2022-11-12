import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { useSurfaces } from '../../libs/store/models/surfaces';

import { Surface } from '../../libs/store/models/surfaces/types';
import { IconButton, IconName, TextInput } from '../base';
import Card from '../base/Card';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import RoomSurfaceSelector from '../surfaces/RoomSurfaceSelector';

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
  const { surfaceTemplates } = useSurfaces();
  const { getNextId } = useCurrentOrg();
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
      <RoomTypeSelector
        selected={roomType}
        onSelect={(rt) => {
          if (!surfaces?.length) {
            const hydratedSurfaces: Surface[] = [];
            rt?.defaultSurfaces?.forEach((sId) => {
              const st = surfaceTemplates[sId];
              if (!st) return;
              hydratedSurfaces.push({
                id: getNextId(),
                name: st.name,
                surfaceTemplate: st,
              });
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
        onSelect={addSurface}
        excluding={surfaces}
        detached={roomType?.name === 'none'}
      />

      {surfaces.map((surface, i) => (
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
          }}
          key={`${surface.surfaceTemplate.id}-${surface.id}`}
        >
          {surface.name}
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
