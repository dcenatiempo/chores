import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditLevel from './AddOrEditLevel';
import LevelsListItem from './LevelsListItem';

interface AddPeopleProps {
  levels: Level[] | undefined;
  onClickAdd?: (level: Level) => void;
  onClickDelete?: (level: Level) => void;
  onClickEdit?: (level: Level) => void;
}

const AddOrEditLevelsList: FC<AddPeopleProps> = ({
  levels = [],
  onClickAdd,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <AddOrEditList
      resources={levels}
      addResource={onClickAdd}
      deleteResource={onClickDelete}
      editResource={onClickEdit}
      resourceName={'Level'}
      renderResource={(item) => <LevelsListItem level={item} />}
      keyExtractor={(level) => level.id}
      AddOrEditResource={AddOrEditLevel}
    />
  );
};

export default AddOrEditLevelsList;
