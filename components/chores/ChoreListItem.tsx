import { FC } from 'react';
import { ChoreTemplate } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton } from '../buttons';

interface ChoreListItemProps {
  chore: ChoreTemplate;
  onClickDelete?: (chore: ChoreTemplate) => void;
  onClickEdit?: (chore: ChoreTemplate) => void;
}
const ChoreListItem: FC<ChoreListItemProps> = ({
  chore,
  onClickDelete,
  onClickEdit,
}) => {
  function onClickDeleteChore() {
    onClickDelete?.(chore);
  }

  function onClickEditChore() {
    onClickEdit?.(chore);
  }

  return (
    <ListItem>
      {chore.name}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {onClickEdit ? (
          <EditButton disabled onClick={onClickEditChore} />
        ) : null}
        {onClickDelete ? <DeleteButton onClick={onClickDeleteChore} /> : null}
      </div>
    </ListItem>
  );
};

export default ChoreListItem;
