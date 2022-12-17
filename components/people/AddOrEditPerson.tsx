import { FC } from 'react';
import { ColorSelector, DateSelector, TextInput } from '../base';

interface AddOrEditPersonProps {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  birthday: number | undefined;
  setBirthday: (birthday: number | undefined) => void;
  color: string;
  setColor: (color: string) => void;
}

const AddPerson: FC<AddOrEditPersonProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
  color,
  setColor,
}) => {
  return (
    <>
      <TextInput label="First" value={firstName} onChange={setFirstName} />
      <br />
      <TextInput label="Last" value={lastName} onChange={setLastName} />
      <br />
      <DateSelector
        id="birthday"
        onChange={setBirthday}
        date={birthday}
        label="Birthday"
      />
      <br />
      <ColorSelector id="person-color" onChange={setColor} color={color} />
    </>
  );
};

export default AddPerson;
