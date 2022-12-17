import { FC, useState } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditPerson from './AddOrEditPerson';
import PersonListItem from './PersonListItem';

interface AddPeopleProps {
  people: Person[] | undefined;
  addPerson?: (person: Person) => void;
  deletePerson?: (person: Person) => void;
  editPerson?: (person: Person) => void;
}

const AddOrEditPeopleList: FC<AddPeopleProps> = ({
  people = [],
  addPerson,
  deletePerson,
  editPerson,
}) => {
  const [personId, setPersonId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState<number>();
  const [color, setColor] = useState('');

  const disabled = !isFormValid();

  function setForm(person?: Person) {
    setPersonId(person?.id || '');
    setFirstName(person?.firstName || '');
    setLastName(person?.lastName || '');
    setBirthday(person?.birthday);
    setColor(person?.color || '');
  }

  function clearForm() {
    setPersonId('');
    setFirstName('');
    setLastName('');
    setBirthday(undefined);
    setColor('');
  }

  function isFormValid() {
    if (!firstName) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (person: Person) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      id: personId,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      color: color,
    } as Person);
  }

  function _onClickAdd() {
    onClickAddOrSave(addPerson);
  }
  function _onClickEdit() {
    onClickAddOrSave(editPerson);
  }
  function _onClickDelete(person: Person) {
    deletePerson?.(person);
  }

  return (
    <AddOrEditList
      resources={people}
      onClickAdd={addPerson ? _onClickAdd : undefined}
      onClickSave={editPerson ? _onClickEdit : undefined}
      onClickDelete={deletePerson ? _onClickDelete : undefined}
      resourceName={['Person', 'People']}
      renderResource={(item) => <PersonListItem person={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditPerson
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birthday={birthday}
          setBirthday={setBirthday}
          color={color}
          setColor={setColor}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditPeopleList;
