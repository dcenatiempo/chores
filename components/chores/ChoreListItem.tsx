import { FC } from 'react';
import { Chore } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton, AddButton } from '../buttons';

interface ChoreListItemProps {
  chore: Chore;
  onClickDelete?: (chore: Chore) => void;
  onClickEdit?: (chore: Chore) => void;
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
