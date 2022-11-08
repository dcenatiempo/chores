import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditPeopleList from '../../components/people/AddOrEditPeopleList';
import AddOrEditRoomsList from '../../components/rooms/AddOrEditRoomsList';
import AddOrEditLevelsList from '../../components/levels/AddOrEditLevelsList';

const Household: NextPage = () => {
  const {
    org,
    addPerson,
    deletePerson,
    deleteRoom,
    addRoom,
    editRoom,
    editPerson,
    addLevel,
    deleteLevel,
  } = useCurrentOrg();

  return (
    <PageWrapper metaTitle="Chore Household">
      <AddOrEditPeopleList
        people={org.people}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
        onClickEdit={editPerson}
      />
      <AddOrEditRoomsList
        rooms={org.rooms}
        onClickAdd={addRoom}
        onClickDelete={deleteRoom}
        onClickEdit={editRoom}
      />
      <AddOrEditLevelsList
        levels={org.levels}
        onClickAdd={addLevel}
        onClickDelete={deleteLevel}
        // onClickEdit={editLevel}
      />
    </PageWrapper>
  );
};

export default Household;
