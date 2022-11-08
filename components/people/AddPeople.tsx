import { FC, useState } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import { Button, Card } from '../base';
import Modal from '../base/Modal';
import AddPerson from './AddPerson';
import PeopleList from './PeopleList';

export interface AddPeopleProps {
  people: Person[] | undefined;
  onClickAdd: (person: Person) => void;
  onClickDelete: (person: Person) => void;
}

const AddPeople: FC<AddPeopleProps> = ({
  people = [],
  onClickAdd,
  onClickDelete,
}) => {
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  return (
    <>
      <Card>
        <div style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20 }}>
          People
        </div>
        <PeopleList people={people} onClickDelete={onClickDelete} />
        <Button
          onClick={() => setShowAddPersonModal(true)}
          label="Add Person"
        />
      </Card>
      <Modal
        visible={showAddPersonModal}
        onClose={() => setShowAddPersonModal(false)}
        title={'Hello modal'}
      >
        <AddPerson
          onClickAdd={(person) => {
            setShowAddPersonModal(false);
            onClickAdd(person);
          }}
        />
      </Modal>
    </>
  );
};

export default AddPeople;
