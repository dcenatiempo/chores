import { FC, useState } from 'react';
import { Person } from '../../libs/redux/slices/organizations';
import { Button, TextInput } from '../base';

export interface OnClickAddProps {
  firstName: string;
  lastName: string;
}

export interface AddPeopleProps {
  people: Person[] | undefined;
  onClickAdd: ({ firstName, lastName }: OnClickAddProps) => void;
}

const AddPeople: FC<AddPeopleProps> = ({ people = [], onClickAdd }) => {
  return (
    <div>
      {people.map((person) => (
        // todo: get better key
        <PersonRow key={person.firstName} person={person} />
      ))}
      <AddPersonInput onClickAdd={onClickAdd} />
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

interface AddPersonInputProps {
  onClickAdd: ({ firstName, lastName }: OnClickAddProps) => void;
}
const AddPersonInput: FC<AddPersonInputProps> = ({ onClickAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function onClickButton() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    onClickAdd({ firstName, lastName });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <Button label="Add New Person" onClick={onClickButton} />
    </div>
  );
};
