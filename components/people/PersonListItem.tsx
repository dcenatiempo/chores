import { FC } from 'react';
import { timestampToAge } from '../../libs/dateTime';
import { Person } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton, AddButton } from '../buttons';

interface PersonListItemProps {
  person: Person;
  onClickDelete?: (person: Person) => void;
  onClickEdit?: (person: Person) => void;
}
const PersonListItem: FC<PersonListItemProps> = ({
  person,
  onClickDelete,
  onClickEdit,
}) => {
  function onClickDeletePerson() {
    onClickDelete?.(person);
  }

  function onClickEditPerson() {
    onClickEdit?.(person);
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
        {onClickEdit ? (
          <EditButton disabled onClick={onClickEditPerson} />
        ) : null}
        {onClickDelete ? <DeleteButton onClick={onClickDeletePerson} /> : null}
      </div>
    </ListItem>
  );
};

export default PersonListItem;
