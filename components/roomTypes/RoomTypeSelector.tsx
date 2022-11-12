import { FC } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import Dropdown from '../base/Dropdown';

export interface RoomTypeSelectorProps {
  onSelect: (roomType: RoomType | undefined) => void;
  selected: RoomType | undefined;
  roomTypes?: RoomType[];
}

const RoomTypeSelector: FC<RoomTypeSelectorProps> = ({
  onSelect,
  selected,
  roomTypes,
}) => {
  const { customRoomTypesArray } = useCurrentOrg();
  const { roomTypesArray } = useRoomTypes();
  const allRoomTypes = [...roomTypesArray, ...customRoomTypesArray];
  return (
    <div>
      <Dropdown
        label="Room Type"
        valueKey={(option) => option?.id || ''}
        labelKey={(option) => option?.name || ''}
        options={roomTypes || allRoomTypes}
        onSelect={onSelect}
        selected={selected}
        id="roomTypes"
      />
    </div>
  );
};

export default RoomTypeSelector;
