import { FC, useState } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { Surface } from '../../libs/store/models/surfaces/types';
import { Button, TextInput } from '../base';
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
  const { roomTypes } = useRoomTypes();

  function hydrateRoomType(type?: string) {
    if (!type) return undefined;
    return roomTypes.find((rt) => rt.id === type);
  }

  const [roomType, setRoomType] = useState<RoomType | undefined>(
    hydrateRoomType(initialResource?.type)
  );
  const [level, setLevel] = useState<string | undefined>(
    initialResource?.level || undefined
  );
  const [surfaces, setSurfaces] = useState<Surface[]>(
    initialResource?.surfaces || []
  );

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
  function onClickSubmitRoom() {
    if (disabled) return;
    const newRoom: Room = {
      level,
      name,
      type: roomType.id,
      id: roomId,
      surfaces: surfaces,
    };
    resetForm();
    onSubmitResource(newRoom);
  }

  return (
    <Card>
      {`${isEdit ? 'EDIT' : 'ADD'} ROOM`}
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
      <Button
        label={`${isEdit ? 'Edit' : 'Add'} Room`}
        disabled={disabled}
        onClick={onClickSubmitRoom}
      />
    </Card>
  );
};

export default AddOrEditRoom;
