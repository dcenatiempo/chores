import { FC } from 'react';
import { UIChoreFeedItem } from '../../libs/store/models/scheduledChores/types';
import { Icon, IconName, ListItem } from '../base';

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
      <div style={{ fontSize: 12, cursor: 'pointer' }} onClick={_onClickChore}>
        {chore.name} ({chore.person.name})
        {chore.tasks.every((t) => t.completed) ? (
          <Icon name={IconName.CHECK} />
        ) : null}
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
              <div
                style={{
                  textDecoration: t.completed ? 'line-through' : undefined,
                  cursor: 'pointer',
                }}
              >
                {t.name} {t.completed}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ListItem>
  );
};

export default ChoreFeedItem;
