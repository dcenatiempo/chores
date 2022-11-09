import { FC } from 'react';
import { Chore } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditChore from './AddOrEditChore';
import ChoreListItem from './ChoreListItem';

interface AddOrEditChoresListProps {
  chores: Chore[] | undefined;
  onClickAdd: (chore: Chore) => void;
  onClickDelete: (chore: Chore) => void;
  onClickEdit: (chore: Chore) => void;
}

const AddOrEditChoresList: FC<AddOrEditChoresListProps> = ({
  chores = [],
  onClickAdd,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <AddOrEditList
      resources={chores}
      addResource={onClickAdd}
      deleteResource={onClickDelete}
      editResource={onClickEdit}
      resourceName={'Chore'}
      renderResource={(item) => <ChoreListItem chore={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      AddOrEditResource={AddOrEditChore}
    />
  );
};

export default AddOrEditChoresList;
