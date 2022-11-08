import { FC } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton, AddButton } from '../buttons';

interface PersonListItemProps {
  person: Person;
  onClickDelete: (person: Person) => void;
}
const PersonListItem: FC<PersonListItemProps> = ({ person, onClickDelete }) => {
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
    <ListItem>
      {person.firstName} {person.lastName}{' '}
      {person.birthday ? timestampToAge(person.birthday) : ''}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        <EditButton disabled onClick={onClickEditPerson} />
        <DeleteButton onClick={onClickDeletePerson} />
      </div>
    </ListItem>
  );
};

export default PersonListItem;
