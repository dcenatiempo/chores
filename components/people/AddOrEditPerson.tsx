import { FC, useState } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import { TextInput } from '../base';
import { AddOrEditResourceProps } from '../base/AddOrEditList';
import { DateSelector } from '../base/DateSelector';
import { AddButton } from '../buttons';

interface AddOrEditPersonProps extends AddOrEditResourceProps<Person> {}

const AddPerson: FC<AddOrEditPersonProps> = ({
  initialResource,
  onSubmitResource,
}) => {
  const personId = initialResource?.id || '';

  const [firstName, setFirstName] = useState(initialResource?.firstName || '');
  const [lastName, setLastName] = useState(initialResource?.lastName || '');
  const [date, setDate] = useState(initialResource?.birthday);

  function onClickAddPerson() {
    if (firstName.length === 0) return;
    setFirstName('');
    setLastName('');
    setDate(undefined);
    onSubmitResource({ firstName, lastName, birthday: date, id: personId });
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
