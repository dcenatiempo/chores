import { FC } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/slices/orgs/types';
import { EditButton, DeleteButton, AddButton } from '../buttons';

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
        paddingLeft: 10,
        paddingRight: 10,
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

export default PersonRow;
