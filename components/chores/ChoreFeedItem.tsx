import { FC } from 'react';
import { UIChoreFeedItem } from '../../libs/store/models/scheduledChores/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton, AddButton } from '../buttons';

interface ChoreFeedItemProps {
  chore: UIChoreFeedItem;
  onClickChore?: (choreId: string) => void;
  onClickTask?: (choreId: string, taskId: string) => void;
}
const ChoreFeedItem: FC<ChoreFeedItemProps> = ({
  chore,
  onClickChore,
  onClickTask,
}) => {
  function _onClickChore() {
    onClickChore?.(chore.id);
  }

  function _onClickTask(id: string) {
    onClickTask?.(chore.id, id);
  }

  return (
    <ListItem>
      <div onClick={_onClickChore}>
        {chore.name} {chore.person.name}{' '}
        {chore.tasks.every((t) => t.completed) ? 'x' : 'o'}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        <ul>
          {chore.tasks.map((t) => (
            <li key={t.id} onClick={() => _onClickTask(t.id)}>
              {t.name} {t.completed ? 'x' : 'o'}
            </li>
          ))}
        </ul>
      </div>
    </ListItem>
  );
};

export default ChoreFeedItem;
