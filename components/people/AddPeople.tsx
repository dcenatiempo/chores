import { FC, useState } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/slices/orgs/types';
import { Button, TextInput } from '../base';
import Card from '../base/Card';
import { DateSelector } from '../base/DateSelector';

export interface OnClickAddProps {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface AddPeopleProps {
  people: Person[] | undefined;
  onClickAdd: ({ firstName, lastName }: OnClickAddProps) => void;
}

const AddPeople: FC<AddPeopleProps> = ({ people = [], onClickAdd }) => {
  return (
    <Card>
      {people.map((person) => (
        // todo: get better key
        <PersonRow key={person.firstName} person={person} />
      ))}
      <AddPersonInput onClickAdd={onClickAdd} />
    </Card>
  );
};

export default AddPeople;

interface PersonRowProps {
  person: Person;
}
const PersonRow: FC<PersonRowProps> = ({ person }) => {
  return (
    <div>
      {person.firstName} {person.lastName}{' '}
      {person.birthday ? timestampToAge(person.birthday) : ''}
    </div>
  );
};

interface AddPersonInputProps {
  onClickAdd: ({ firstName, lastName, birthday }: OnClickAddProps) => void;
}
const AddPersonInput: FC<AddPersonInputProps> = ({ onClickAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');

  function onClickButton() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    onClickAdd({ firstName, lastName, birthday: date });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <DateSelector id="birthday" onChange={setDate} date={date} />
      <Button label="Add New Person" onClick={onClickButton} />
    </div>
  );
};
