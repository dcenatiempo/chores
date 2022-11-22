import { lstat } from 'fs/promises';
import { FC, useMemo, useState } from 'react';
import {
  getChoreRoomTypes,
  getTaskLevels,
  getTaskRooms,
  getTaskRoomTypes,
} from '../../libs/store/models/orgs/transformers';
import {
  ChoreTemplate,
  Level,
  Person,
  Room,
} from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { Task } from '../../libs/store/models/scheduledChores/types';
import {
  arrayToMap,
  mapToArray,
} from '../../libs/store/models/sharedTransformers';
import { Map } from '../../libs/store/models/types';

import { Dropdown, TextInput } from '../base';
import Card from '../base/Card';
import FilterRooms from '../filters/FilterRooms';
import LevelSelector from '../levels/LevelSelector';
import LevelsSelector from '../levels/LevelsSelector';
import RoomSelector from '../rooms/RoomSelector';
import RoomsSelector from '../rooms/RoomsSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';
import RoomTypesSelector from '../roomTypes/RoomTypesSelector';
import ScheduleSelector, { ScheduledSelectorProps } from './ScheduleSelector';

export interface AddOrEditScheduledChoreProps extends ScheduledSelectorProps {
  personId?: string;
  setPersonId: (personId?: string) => void;
  choreTemplateId?: string;
  setChoreTemplateId: (choreTemplateId?: string) => void;
  choreName: string;
  setChoreName: (name: string) => void;
  ///
  taskTemplateIds: string[];
  levels: Level[];
  rooms: Room[];
  roomTypes: RoomType[];
  setLevels: (levels: Level[]) => void;
  setRooms: (rooms: Room[]) => void;
  setRoomTypes: (roomTypes: RoomType[]) => void;
}

const AddOrEditScheduledChore: FC<AddOrEditScheduledChoreProps> = ({
  personId,
  setPersonId,
  choreTemplateId,
  setChoreTemplateId,
  choreName,
  setChoreName,
  ///
  taskTemplateIds,
  levels,
  setLevels,
  rooms,
  setRooms,
  roomTypes,
  setRoomTypes,
  ///
  ...scheduleSelectorProps
}) => {
  const { peopleArray, choresArray, roomsArray, chores } = useCurrentOrg();

  function _setPersonId(person?: Person) {
    setPersonId(person?.id || '');
  }

  function _setChoreTemplateId(chore?: ChoreTemplate) {
    setChoreTemplateId(chore?.id || '');
  }

  return (
    <Card>
      <Dropdown
        options={choresArray}
        valueKey={(c) => `${c?.id || c}`}
        labelKey={(c) => c?.name || ''}
        id={'choose-chore'}
        onSelect={_setChoreTemplateId}
        selected={choreTemplateId}
        label={'Chore'}
      />
      <ChoreOptions
        taskTemplateIds={taskTemplateIds}
        levels={levels}
        rooms={rooms}
        roomTypes={roomTypes}
        setLevels={setLevels}
        setRooms={setRooms}
        setRoomTypes={setRoomTypes}
      />
      <br />
      <TextInput value={choreName} onChange={setChoreName} label={'name'} />
      <Dropdown
        options={peopleArray}
        valueKey={(p) => `${p?.id || p}`}
        labelKey={(p) => `${p?.firstName} ${p?.lastName}`.trim()}
        id={'choose-person'}
        onSelect={_setPersonId}
        selected={personId}
        label={'Person'}
      />
      <br />
      <ScheduleSelector {...scheduleSelectorProps} />
    </Card>
  );
};

export default AddOrEditScheduledChore;

function ChoreOptions({
  taskTemplateIds,
  levels,
  setLevels,
  rooms,
  setRooms,
  roomTypes,
  setRoomTypes,
}: {
  taskTemplateIds: string[];
  levels: Level[];
  rooms: Room[];
  roomTypes: RoomType[];
  setLevels: (levels: Level[]) => void;
  setRooms: (rooms: Room[]) => void;
  setRoomTypes: (roomTypes: RoomType[]) => void;
}) {
  const { roomsArray, tasks: taskMap } = useCurrentOrg();

  const taskTemplates = useMemo(
    () => taskTemplateIds.map((id) => taskMap[id]),
    [taskMap, taskTemplateIds]
  );

  const levelOptions = useMemo(() => {
    const levels: Map<Level> = taskTemplates.reduce((acc, t, index) => {
      const ls = getTaskLevels(t, roomsArray);
      if (index === 0) return ls;
      return intersectingObject(acc, ls);
    }, {});
    return mapToArray(levels);
  }, [taskTemplates, roomsArray]);

  const roomTypeOptions = useMemo(() => {
    const roomTypes: Map<RoomType> = taskTemplates.reduce((acc, t, index) => {
      const rts = getTaskRoomTypes(t, roomsArray);
      if (!index) return rts;
      return intersectingObject(acc, rts);
    }, {});
    return mapToArray(roomTypes);
  }, [roomsArray, taskTemplates]);

  const roomOptions = useMemo(() => {
    const rooms: Map<Room> = taskTemplates.reduce((acc, t, index) => {
      const rs = getTaskRooms(t, roomsArray);
      if (!index) return rs;
      return intersectingObject(acc, rs);
    }, {});
    return mapToArray(rooms);
  }, [roomsArray, taskTemplates]);

  return (
    <div>
      <LevelsSelector
        onSelect={setLevels}
        selected={levels}
        levels={levelOptions}
      />
      <RoomTypesSelector
        selected={roomTypes}
        onSelect={setRoomTypes}
        roomTypes={roomTypeOptions}
      />
      <RoomsSelector selected={rooms} onSelect={setRooms} rooms={roomOptions} />
      <br />
      <br />
    </div>
  );
}

function intersectingKeys(o1: Map<any>, o2: Map<any>) {
  return Object.keys(o1).filter((k) => k in o2);
}

function intersectingObject(o1: Map<any>, o2: Map<any>) {
  const keys = intersectingKeys(o1, o2);
  return keys.reduce((acc, key) => {
    return { ...acc, [key]: o1[key] };
  }, {});
}
