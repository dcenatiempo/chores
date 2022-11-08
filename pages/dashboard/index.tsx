import type { NextPage } from 'next';

import AddPeople from '../../components/people/AddPeople';
import { addPersonToOrg, updatePeopleFromOrg } from '../../libs/firebase';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import RoomsList from '../../components/rooms/RoomsList';
import { Person } from '../../libs/store/models/orgs/types';
import { Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';

const Dashboard: NextPage = () => {
  const { org, addPerson, deletePerson } = useCurrentOrg();

  return (
    <PageWrapper metaTitle="Chore Dashboard">
      <Card>
        <RoomsList rooms={org.rooms} />
      </Card>
      <AddPeople
        people={org.people}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
      />
    </PageWrapper>
  );
};

export default Dashboard;
