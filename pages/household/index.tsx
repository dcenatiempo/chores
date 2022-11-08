import type { NextPage } from 'next';

import AddPeople from '../../components/people/AddPeople';
import { addPersonToOrg, updatePeopleFromOrg } from '../../libs/firebase';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import RoomsList from '../../components/rooms/RoomsList';
import AddRoom from '../../components/rooms/AddRoom';
import { Person, Room } from '../../libs/store/models/orgs/types';
import { Button, Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';
import Modal from '../../components/base/Modal';
import { useState } from 'react';

const Household: NextPage = () => {
  const { org } = useCurrentOrg();
  function onAddPerson(person: Person) {
    if (!org.id) return;
    addPersonToOrg({
      person,
      orgId: org.id,
    });
  }

  function onClickDeleteRoom(room: Room) {
    if (!org.id) return;
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

  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  return (
    <PageWrapper metaTitle="Chore Household">
      <Card>
        <RoomsList rooms={org.rooms} onClickDelete={onClickDeleteRoom} />
        <Button onClick={() => setShowAddRoomModal(true)} label="Add Room" />
      </Card>
      <AddPeople
        people={org.people}
        onClickAdd={onAddPerson}
        onClickDelete={onDeletePerson}
      />
      <Modal
        visible={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
        title={'Hello modal'}
      >
        <AddRoom onAddRoom={() => setShowAddRoomModal(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default Household;
