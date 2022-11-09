import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton } from '../buttons';

interface LevelListItemProps {
  level: Level;
  onClickDelete?: (level: Level) => void;
  onClickEdit?: (level: Level) => void;
}
const LevelListItem: FC<LevelListItemProps> = ({
  level,
  onClickDelete,
  onClickEdit,
}) => {
  function onClickDeleteLevel() {
    onClickDelete?.(level);
  }

  function onClickEditLevel() {
    onClickEdit?.(level);
  }
  return (
    <ListItem>
      {level.name}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {onClickEdit ? (
          <EditButton disabled onClick={onClickEditLevel} />
        ) : null}
        {onClickDelete ? <DeleteButton onClick={onClickDeleteLevel} /> : null}
      </div>
    </ListItem>
  );
};

export default LevelListItem;
