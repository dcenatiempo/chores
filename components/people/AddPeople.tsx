import { FC } from 'react';
import { Person } from '../../libs/store/slices/orgs/types';
import { Card } from '../base';
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
  return (
    <Card>
      <div style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20 }}>
        People
      </div>
      <PeopleList people={people} onClickDelete={onClickDelete} />
      <AddPerson onClickAdd={onClickAdd} />
    </Card>
  );
};

export default AddPeople;
