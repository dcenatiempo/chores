import type { NextPage } from 'next';

import AddPeople from '../../components/people/AddPeople';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import RoomsList from '../../components/rooms/RoomsList';
import AddRoom from '../../components/rooms/AddRoom';
import { Button, Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';
import Modal from '../../components/base/Modal';
import { useState } from 'react';

const Household: NextPage = () => {
  const { org, addPerson, deletePerson, deleteRoom, addRoom } = useCurrentOrg();

  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  return (
    <PageWrapper metaTitle="Chore Household">
      <Card>
        <RoomsList rooms={org.rooms} onClickDelete={deleteRoom} />
        <Button onClick={() => setShowAddRoomModal(true)} label="Add Room" />
      </Card>
      <AddPeople
        people={org.people}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
      />
      <Modal
        visible={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
        title={'Hello modal'}
      >
        <AddRoom
          onAddRoom={(room) => {
            addRoom(room);
            setShowAddRoomModal(false);
          }}
        />
      </Modal>
    </PageWrapper>
  );
};

export default Household;
