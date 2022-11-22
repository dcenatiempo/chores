import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import MultiselectDropdown from '../base/MultiselectDropdown';

export interface RoomsSelectorProps {
  onSelect: (room: Room[]) => void;
  selected: Room[];
  rooms?: Room[];
}

const RoomsSelector: FC<RoomsSelectorProps> = ({
  onSelect,
  selected,
  rooms,
}) => {
  const { roomsArray } = useCurrentOrg();
  return (
    <div>
      <MultiselectDropdown
        label="Room"
        valueKey={(option) => option?.id || ''}
        labelKey={(option) => option?.name || ''}
        options={rooms || roomsArray}
        onSelect={onSelect}
        selected={selected}
        id="roomTypes"
      />
    </div>
  );
};

export default RoomsSelector;
