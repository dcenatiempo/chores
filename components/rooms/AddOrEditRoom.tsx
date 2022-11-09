import { FC, useState } from 'react';
import { Level, Room } from '../../libs/store/models/orgs/types';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { arrayToMap } from '../../libs/store/models/sharedTransformers';
import { Surface } from '../../libs/store/models/surfaces/types';
import { Button, IconButton, IconName, TextInput } from '../base';
import { AddOrEditResourceProps } from '../base/AddOrEditList';
import Card from '../base/Card';
import LevelSelector from '../levels/LevelSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import SurfaceSelector from '../surfaces/SurfaceSelector';

export interface AddOrEditRoomProps extends AddOrEditResourceProps<Room> {}

const AddOrEditRoom: FC<AddOrEditRoomProps> = ({
  initialResource,
  onSubmitResource,
}) => {
  const isEdit = !!initialResource;
  const roomId = initialResource?.id || '';
  const [name, setName] = useState(initialResource?.name || '');

  const [roomType, setRoomType] = useState<RoomType | undefined>(
    initialResource?.roomType
  );
  const [level, setLevel] = useState<Level | undefined>(initialResource?.level);
  const [surfaces, setSurfaces] = useState<Surface[]>(
    Object.values(initialResource?.surfaces || {})
  );

  function addSurface(surface: Surface | undefined) {
    if (!surface) return;
    setSurfaces([surface, ...surfaces]);
  }

  function removeSurface(index: number) {
    const newSurfaces = surfaces.filter((_, i) => i !== index);
    setSurfaces(newSurfaces);
  }

  const disabled = !(name && roomType && level && surfaces.length);

  function resetForm() {
    setName('');
    setSurfaces([]);
  }
  function onClickSubmitRoom() {
    if (disabled) return;
    const newRoom: Room = {
      level,
      name,
      roomType: roomType,
      id: roomId,
      surfaces: arrayToMap(surfaces),
    };
    resetForm();
    onSubmitResource(newRoom);
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
          key={`${surface.id}-${surface.descriptor}`}
        >
          {surface.name} {surface.descriptor ? `(${surface.descriptor})` : ''}
          <IconButton
            onClick={() => removeSurface(i)}
            iconName={IconName.MINUS}
            type="sentance"
          />
        </div>
      ))}
      <Button
        label={`${isEdit ? 'Edit' : 'Add'} Room`}
        disabled={disabled}
        onClick={onClickSubmitRoom}
      />
    </Card>
  );
};

export default AddOrEditRoom;
