import { FC } from 'react';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { ScheduledChore } from '../../libs/store/models/scheduledChores/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton } from '../buttons';

interface ScheduledChoreListItemProps {
  chore: ScheduledChore;
  onClickDelete?: (chore: ScheduledChore) => void;
  onClickEdit?: (chore: ScheduledChore) => void;
}
const ScheduledChoreListItem: FC<ScheduledChoreListItemProps> = ({
  chore,
  onClickDelete,
  onClickEdit,
}) => {
  const { people, chores } = useCurrentOrg();

  function onClickDeleteChore() {
    onClickDelete?.(chore);
  }

  function onClickEditChore() {
    onClickEdit?.(chore);
  }

  return (
    <ListItem>
      {people[chore?.personId]?.firstName}: {chores[chore?.orgChoreId]?.name}
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

export default ScheduledChoreListItem;
