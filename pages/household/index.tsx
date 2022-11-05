import type { NextPage } from 'next';

import AddPeople from '../../components/people/AddPeople';
import { addPersonToOrg, updatePeopleFromOrg } from '../../libs/firebase';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import RoomsList from '../../components/rooms/RoomsList';
import AddRoom from '../../components/rooms/AddRoom';
import { Person } from '../../libs/store/models/orgs/types';
import { Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';

const Household: NextPage = () => {
  const { org } = useCurrentOrg();
  function onAddPerson(person: Person) {
    if (!org.id) return;
    addPersonToOrg({
      person,
      orgId: org.id,
    });
  }

  function onDeletePerson({ firstName, lastName }: Person) {
    if (!org.id) return;
    updatePeopleFromOrg({
      people:
        org.people?.filter(
          (person) =>
            person.firstName !== firstName && person.lastName !== lastName
        ) || [],
      orgId: org.id,
    });
  }

  return (
    <PageWrapper metaTitle="Chore Household">
      <AddRoom />
      <Card>
        <RoomsList rooms={org.rooms} />
      </Card>
      <AddPeople
        people={org.people}
        onClickAdd={onAddPerson}
        onClickDelete={onDeletePerson}
      />
    </PageWrapper>
  );
};

export default Household;
