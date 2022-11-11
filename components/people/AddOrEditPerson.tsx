import { FC } from 'react';
import { TextInput } from '../base';
import { DateSelector } from '../base/DateSelector';

interface AddOrEditPersonProps {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  birthday: number | undefined;
  setBirthday: (birthday: number | undefined) => void;
}

const AddPerson: FC<AddOrEditPersonProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
}) => {
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
      <DateSelector id="birthday" onChange={setBirthday} date={birthday} />
    </div>
  );
};

export default AddPerson;
