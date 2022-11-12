import { FC } from 'react';
import { Room } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import Dropdown from '../base/Dropdown';

export interface RoomSelectorProps {
  onSelect: (room: Room | undefined) => void;
  selected: Room | undefined;
  rooms?: Room[];
}

const RoomSelector: FC<RoomSelectorProps> = ({ onSelect, selected, rooms }) => {
  const { roomsArray } = useCurrentOrg();
  return (
    <div>
      <Dropdown
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

export default RoomSelector;
