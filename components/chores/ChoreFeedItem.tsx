import { FC } from 'react';
import useAppState from '../../libs/store/appState/useAppState';
import { UIChoreFeedItem } from '../../libs/store/models/scheduledChores/types';
import { Button, Icon, IconButton, IconName, ListItem } from '../base';

interface ChoreFeedItemProps {
  chore: UIChoreFeedItem;
  onClickChore?: () => void;
  onClickTask?: (taskId: string) => void;
  onClickApproveTask?: (taskId: string) => void;
}
const ChoreFeedItem: FC<ChoreFeedItemProps> = ({
  chore,
  onClickChore,
  onClickTask,
  onClickApproveTask,
}) => {
  const { isKidMode } = useAppState();

  function _onClickChore() {
    onClickChore?.();
  }

  function _onClickTask(id: string) {
    onClickTask?.(id);
  }

  function onPressThumbsUp(id: string) {
    onClickApproveTask?.(id);
  }

  return (
    <ListItem>
      <div style={{ fontSize: 12, cursor: 'pointer' }} onClick={_onClickChore}>
        {chore.name} ({chore.person.name})
        <Icon
          style={{
            visibility: chore.tasks.every((t) => t.completed)
              ? undefined
              : 'hidden',
          }}
          name={IconName.CHECK}
        />
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
          {chore.tasks.map((t) => {
            const disabled = isKidMode || !t.completed;

            return (
              <li key={t.id} style={{ display: 'flex' }}>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <Button
                    type="sentance"
                    style={{
                      textDecoration: t.completed ? 'line-through' : undefined,
                      cursor: 'pointer',
                    }}
                    onClick={() => _onClickTask(t.id)}
                    label={`${t.name}`}
                  />
                </div>

                <div style={{ display: 'flex', opacity: disabled ? 0.5 : 1 }}>
                  <IconButton
                    disabled={disabled}
                    outlined={!t.approved}
                    type="invisible"
                    iconName={IconName.THUMBS_UP}
                    onClick={() => onPressThumbsUp(t.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ListItem>
  );
};

export default ChoreFeedItem;
