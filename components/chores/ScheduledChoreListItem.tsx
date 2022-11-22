import { FC } from 'react';
import { Level, Room } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { useRoomTypes } from '../../libs/store/models/roomTypes';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import {
  hydrateScheduledChore,
  hydrateScheduledChoreTask,
} from '../../libs/store/models/scheduledChores/transformers';
import { ScheduledChore } from '../../libs/store/models/scheduledChores/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import { Map } from '../../libs/store/models/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton } from '../buttons';

interface ScheduledChoreListItemProps {
  chore: ScheduledChore;
  onClickDelete?: (chore: ScheduledChore) => void;
  onClickEdit?: (chore: ScheduledChore) => void;
}
const ScheduledChoreListItem: FC<ScheduledChoreListItemProps> = ({
  chore,
  onClickDelete,
  onClickEdit,
}) => {
  const {
    people: peopleMap,
    levels: levelsMap,
    rooms: roomsMap,
    tasks: taskTemplatesMap,
  } = useCurrentOrg();

  const { roomTypes: roomTypesMap } = useRoomTypes();

  function onClickDeleteChore() {
    onClickDelete?.(chore);
  }

  function onClickEditChore() {
    onClickEdit?.(chore);
  }

  function getChoreName() {
    const c = hydrateScheduledChore(
      chore,
      peopleMap,
      taskTemplatesMap,
      levelsMap,
      roomTypesMap,
      roomsMap
    );
    const personName = c.person.firstName;
    const choreName = c.name;
    const locationsMap = c.tasks.reduce<{
      levels: Map<Level>;
      roomTypes: Map<RoomType>;
      rooms: Map<Room>;
    }>(
      (acc, t) => {
        if (t.rooms) acc.rooms = Object.assign(acc.rooms, arrayToMap(t.rooms));
        if (t.levels)
          acc.levels = Object.assign(acc.levels, arrayToMap(t.levels));
        if (t.roomTypes)
          acc.roomTypes = Object.assign(acc.roomTypes, arrayToMap(t.roomTypes));
        return acc;
      },
      { levels: {}, roomTypes: {}, rooms: {} }
    );

    const locationsArray = {
      levels: mapToArray(locationsMap.levels),
      rooms: mapToArray(locationsMap.rooms),
      roomTypes: mapToArray(locationsMap.roomTypes),
    };

    let levelsString = '';
    const levelsLength = locationsArray.levels.length;
    if (levelsLength > 0) {
      if (levelsLength > 1) {
        levelsString = `on ${levelsLength} levels`;
      } else {
        levelsString = `on ${locationsArray.levels[0].name}`;
      }
    }

    let roomTypesString = '';
    const roomTypesLength = locationsArray.roomTypes.length;
    if (roomTypesLength > 0) {
      if (roomTypesLength > 1) {
        roomTypesString = `in ${roomTypesLength} room types`;
      } else {
        roomTypesString = `in all ${locationsArray.roomTypes[0].name}s`;
      }
    }

    let roomsString = '';
    const roomsLength = locationsArray.rooms.length;
    if (roomsLength > 0) {
      if (roomsLength > 1) {
        roomsString = `in ${roomsLength} rooms`;
      } else {
        roomsString = `in the ${locationsArray.rooms[0].name}`;
      }
    }

    return `${personName}: ${choreName} ${roomsString} ${roomTypesString} ${levelsString}`;
  }
  return (
    <ListItem>
      {getChoreName()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {onClickEdit ? (
          <EditButton disabled onClick={onClickEditChore} />
        ) : null}
        {onClickDelete ? <DeleteButton onClick={onClickDeleteChore} /> : null}
      </div>
    </ListItem>
  );
};

export default ScheduledChoreListItem;
