import { FC } from 'react';
import { Person } from '../../libs/redux/slices/organizations';
import { Button } from '../base';

export interface AddPeopleProps {
  people?: Person[];
}

const AddPeople: FC<AddPeopleProps> = ({ people = [] }) => {
  function onClickAdd() {}
  return (
    <div>
      {people.map((person) => (
        // todo: get better key
        <PersonRow key={person.firstName} person={person} />
      ))}
      <Button label="Add New Person" onClick={onClickAdd} />
    </div>
  );
};

export default AddPeople;

interface PersonRowProps {
  person: Person;
}
const PersonRow: FC<PersonRowProps> = ({ person }) => {
  return (
    <div>
      {person.firstName} {person.lastName}
    </div>
  );
};
