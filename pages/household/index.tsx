import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditPeopleList from '../../components/people/AddOrEditPeopleList';
import AddOrEditRoomsList from '../../components/rooms/AddOrEditRoomsList';
import AddOrEditLevelsList from '../../components/levels/AddOrEditLevelsList';
import LevelSelector from '../../components/levels/LevelSelector';
import { Level } from '../../libs/store/models/orgs/types';
import { useMemo, useState } from 'react';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import RoomTypeSelector from '../../components/roomTypes/RoomTypeSelector';

const Household: NextPage = () => {
  const {
    peopleArray,
    roomsArray,
    levelsArray,
    addPerson,
    deletePerson,
    deleteRoom,
    addRoom,
    editRoom,
    editPerson,
    addLevel,
    deleteLevel,
    editLevel,
    roomTypesGroupedByLevel,
    roomTypesInUse,
  } = useCurrentOrg();

  const showRooms = !!levelsArray.length;
  const [level, setLevel] = useState<Level>();
  const [roomType, setRoomType] = useState<RoomType>();

  const uniqueRoomTypes = useMemo(() => {
    if (!level) return roomTypesInUse;
    return roomTypesGroupedByLevel[level.id];
  }, [roomTypesGroupedByLevel, level, roomTypesInUse]);

  const uniqueLevels = useMemo(() => {
    const obj = roomsArray.reduce<{ [roomType: string]: Level }>((acc, r) => {
      const levelId = r.level.id;
      if (!acc[levelId]) acc[levelId] = r.level;
      return { ...acc };
    }, {});
    return Object.values(obj);
  }, [roomsArray]);

  const roomsToShow = useMemo(() => {
    return roomsArray.filter(
      (r) =>
        (level ? r.level.id === level?.id : true) &&
        (roomType ? r.roomType.id === roomType?.id : true)
    );
  }, [roomsArray, level, roomType]);
  return (
    <PageWrapper metaTitle="Chore Household">
      <LevelSelector
        onSelect={setLevel}
        selected={level}
        levels={uniqueLevels}
      />
      <RoomTypeSelector
        onSelect={setRoomType}
        selected={roomType}
        roomTypes={uniqueRoomTypes}
      />
      {showRooms ? (
        <AddOrEditRoomsList
          rooms={roomsToShow}
          addRoom={addRoom}
          deleteRoom={deleteRoom}
          editRoom={editRoom}
        />
      ) : null}
      <AddOrEditLevelsList
        levels={levelsArray}
        addLevel={addLevel}
        deleteLevel={deleteLevel}
        editLevel={editLevel}
      />
      <AddOrEditPeopleList
        people={peopleArray}
        addPerson={addPerson}
        deletePerson={deletePerson}
        editPerson={editPerson}
      />
    </PageWrapper>
  );
};

export default Household;
