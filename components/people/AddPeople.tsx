import { FC, useState } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/slices/orgs/types';
import { Button, TextInput } from '../base';
import Card from '../base/Card';
import { DateSelector } from '../base/DateSelector';
import Icon, { IconColor, IconName } from '../base/Icon';

export interface OnClickAddProps {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface OnClickDeleteProps {
  firstName: string;
  lastName: string;
}

export interface AddPeopleProps {
  people: Person[] | undefined;
  onClickAdd: (props: OnClickAddProps) => void;
  onClickDelete: (props: OnClickDeleteProps) => void;
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
  onClickDelete: (props: OnClickDeleteProps) => void;
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
        }}
      >
        <Button
          disabled
          onClick={onClickEditPerson}
          type="fill"
          color={IconColor.BASIC}
        >
          <Icon name={IconName.EDIT} size={20} outlined />
        </Button>
        <div style={{ width: 10 }} />
        <Button
          onClick={onClickDeletePerson}
          type="fill"
          color={IconColor.BASIC}
        >
          <Icon name={IconName.DELETE} size={20} outlined />
        </Button>
      </div>
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

  function onClickAddPerson() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    setDate('');
    onClickAdd({ firstName, lastName, birthday: date });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <DateSelector id="birthday" onChange={setDate} date={date} />
      <Button onClick={onClickAddPerson} type="fill" color={IconColor.ACTION}>
        <Icon name={IconName.ADD_PERSON} size={20} outlined />
      </Button>
    </div>
  );
};
