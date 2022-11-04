import { FC, useState } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/slices/orgs/types';
import { TextInput } from '../base';
import Card from '../base/Card';
import { DateSelector } from '../base/DateSelector';
import { EditButton, DeleteButton, AddButton } from '../buttons';

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
      {people.map((person) => (
        // todo: get better key
        <PersonRow
          onClickDelete={onClickDelete}
          key={person.firstName}
          person={person}
        />
      ))}
      <AddPersonInput onClickAdd={onClickAdd} />
    </Card>
  );
};

export default AddPeople;

interface PersonRowProps {
  person: Person;
  onClickDelete: (person: Person) => void;
}
const PersonRow: FC<PersonRowProps> = ({ person, onClickDelete }) => {
  function onClickDeletePerson() {
    onClickDelete({
      lastName: person.lastName || '',
      firstName: person.firstName || '',
    });
  }

  function onClickEditPerson() {
    console.log('edit person' + person.firstName);
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {person.firstName} {person.lastName}{' '}
      {person.birthday ? timestampToAge(person.birthday) : ''}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <EditButton disabled onClick={onClickEditPerson} />
        <DeleteButton onClick={onClickDeletePerson} />
      </div>
    </div>
  );
};

interface AddPersonInputProps {
  initialPerson?: Person;
  onClickAdd: ({ firstName, lastName, birthday }: Person) => void;
}
const AddPersonInput: FC<AddPersonInputProps> = ({
  initialPerson,
  onClickAdd,
}) => {
  const [firstName, setFirstName] = useState(initialPerson?.firstName || '');
  const [lastName, setLastName] = useState(initialPerson?.lastName || '');
  const [date, setDate] = useState(initialPerson?.birthday);

  function onClickAddPerson() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    setDate(undefined);
    onClickAdd({ firstName, lastName, birthday: date });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        columnGap: 10,
      }}
    >
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <DateSelector id="birthday" onChange={setDate} date={date} />
      <AddButton onClick={onClickAddPerson} />
    </div>
  );
};
