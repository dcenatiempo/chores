import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditPeopleList from '../../components/people/AddOrEditPeopleList';
import AddOrEditRoomsList from '../../components/rooms/AddOrEditRoomsList';
import AddOrEditLevelsList from '../../components/levels/AddOrEditLevelsList';

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
  } = useCurrentOrg();

  const showRooms = !!levelsArray.length;

  return (
    <PageWrapper metaTitle="Chore Household">
      <AddOrEditPeopleList
        people={peopleArray}
        addPerson={addPerson}
        deletePerson={deletePerson}
        editPerson={editPerson}
      />
      {showRooms ? (
        <AddOrEditRoomsList
          rooms={roomsArray}
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
    </PageWrapper>
  );
};

export default Household;
