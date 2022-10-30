import { FC } from 'react';
import useCurrentOrg from '../../libs/store/slices/orgs/useCurrentOrg';
import { useRoomTypes } from '../../libs/store/slices/roomTypes';
import { RoomType } from '../../libs/store/slices/roomTypes/types';
import Dropdown from '../base/Dropdownx';

export interface RoomTypeSelectorProps {
  onSelect: (roomType: RoomType | undefined) => void;
  selected: RoomType | undefined;
}

const RoomTypeSelector: FC<RoomTypeSelectorProps> = ({
  onSelect,
  selected,
}) => {
  const { org } = useCurrentOrg();
  const { roomTypes } = useRoomTypes();
  const customRoomTypes = org.customRoomTypes || [];
  const allRoomTypes = [...roomTypes, ...customRoomTypes];
  return (
    <div>
      <Dropdown
        value={(option) => option?.id || ''}
        label={(option) => option?.name || ''}
        options={allRoomTypes}
        onSelect={onSelect}
        selected={selected}
        id="roomTypes"
      />
    </div>
  );
};

export default RoomTypeSelector;
