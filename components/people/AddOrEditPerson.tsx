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
    <>
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <br />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <br />
      <DateSelector id="birthday" onChange={setBirthday} date={birthday} />
    </>
  );
};

export default AddPerson;
