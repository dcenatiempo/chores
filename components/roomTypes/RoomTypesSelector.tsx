import { FC } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import MultiselectDropdown from '../base/MultiselectDropdown';

export interface RoomTypesSelectorProps {
  onSelect: (roomType: RoomType[]) => void;
  selected: RoomType[];
  roomTypes?: RoomType[];
}

const RoomTypesSelector: FC<RoomTypesSelectorProps> = ({
  onSelect,
  selected,
  roomTypes,
}) => {
  const { customRoomTypesArray } = useCurrentOrg();
  const { roomTypesArray } = useRoomTypes();
  const allRoomTypes = [...roomTypesArray, ...customRoomTypesArray];
  return (
    <div>
      <MultiselectDropdown
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

export default RoomTypesSelector;
