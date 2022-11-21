import { FC, useMemo } from 'react';
import {
  getChoreName,
  getChoreRoomTypes,
} from '../../libs/store/models/orgs/transformers';
import { Chore, Person, Room } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';

import { Dropdown } from '../base';
import Card from '../base/Card';
import RoomSelector from '../rooms/RoomSelector';
import ScheduleSelector, { ScheduledSelectorProps } from './ScheduleSelector';

export interface AddOrEditScheduledChoreProps extends ScheduledSelectorProps {
  personId?: string;
  setPersonId: (personId?: string) => void;
  choreId?: string;
  setChoreId: (choreId?: string) => void;
  room?: Room;
  setRoom: (room?: Room) => void;
}

const AddOrEditScheduledChore: FC<AddOrEditScheduledChoreProps> = ({
  personId,
  setPersonId,
  choreId,
  setChoreId,
  room,
  setRoom,
  ...scheduleSelectorProps
}) => {
  const { peopleArray, choresArray, roomsArray, chores } = useCurrentOrg();

  function _setPersonId(person?: Person) {
    setPersonId(person?.id || '');
  }

  function _setChoreId(chore?: Chore) {
    setChoreId(chore?.id || '');
  }

  const roomOptions = useMemo(() => {
    const chore = choreId ? chores[choreId] : undefined;
    const roomTypes = getChoreRoomTypes(chore);
    return roomsArray.filter((r) => {
      return !!roomTypes[r.roomType.id];
    });
  }, [choreId, chores, roomsArray]);

  return (
    <Card>
      <Dropdown
        options={peopleArray}
        valueKey={(p) => `${p?.id || p}`}
        labelKey={(p) => `${p?.firstName} ${p?.lastName}`.trim()}
        id={'choose-person'}
        onSelect={_setPersonId}
        selected={personId}
        label={'Person'}
      />
      <Dropdown
        options={choresArray}
        valueKey={(c) => `${c?.id || c}`}
        labelKey={(c) => getChoreName(c)}
        id={'choose-chore'}
        onSelect={_setChoreId}
        selected={choreId}
        label={'Chore'}
      />
      <RoomSelector onSelect={setRoom} selected={room} rooms={roomOptions} />
      <ScheduleSelector {...scheduleSelectorProps} />
    </Card>
  );
};

export default AddOrEditScheduledChore;
