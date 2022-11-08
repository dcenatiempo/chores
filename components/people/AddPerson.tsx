import { FC, useState } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import { TextInput } from '../base';
import { DateSelector } from '../base/DateSelector';
import { AddButton } from '../buttons';

interface AddPersonProps {
  initialPerson?: Person;
  onClickAdd: ({ firstName, lastName, birthday }: Person) => void;
}
const AddPerson: FC<AddPersonProps> = ({ initialPerson, onClickAdd }) => {
  const [firstName, setFirstName] = useState(initialPerson?.firstName || '');
  const [lastName, setLastName] = useState(initialPerson?.lastName || '');
  const [date, setDate] = useState(initialPerson?.birthday);

  function onClickAddPerson() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    setDate(undefined);
    onClickAdd({ firstName, lastName, birthday: date, id: '' });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        columnGap: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <DateSelector id="birthday" onChange={setDate} date={date} />
      <AddButton onClick={onClickAddPerson} />
    </div>
  );
};

export default AddPerson;
