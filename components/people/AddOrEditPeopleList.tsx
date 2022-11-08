import { FC } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditPerson from './AddOrEditPerson';
import PersonListItem from './PersonListItem';

interface AddPeopleProps {
  people: Person[] | undefined;
  onClickAdd: (person: Person) => void;
  onClickDelete: (person: Person) => void;
  onClickEdit: (person: Person) => void;
}

const AddOrEditPeopleList: FC<AddPeopleProps> = ({
  people = [],
  onClickAdd,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <AddOrEditList
      resources={people}
      addResource={onClickAdd}
      deleteResource={onClickDelete}
      editResource={onClickEdit}
      resourceName={'Peopleq'}
      renderResource={(item) => <PersonListItem person={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      AddOrEditResource={AddOrEditPerson}
    />
  );
};

export default AddOrEditPeopleList;
