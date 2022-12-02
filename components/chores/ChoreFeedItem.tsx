import { UIChoreFeedItem } from '../../libs/store/models/scheduledChores/types';
import { Button, IconButton, IconName } from '../base';

interface ChoreFeedItemProps {
  chore: UIChoreFeedItem;
  onClickChore?: () => void;
  onClickTask?: (taskId: string) => void;
  onClickApproveTask?: (taskId: string) => void;
  isKidMode: boolean;
}
export default function ChoreFeedItemChoreFeedItemProps({
  chore,
  onClickChore,
  onClickTask,
  onClickApproveTask,
  isKidMode,
}: ChoreFeedItemProps) {
  function _onClickChore() {
    onClickChore?.();
  }

  function _onClickTask(id: string) {
    onClickTask?.(id);
  }

  function onPressThumbsUp(id: string) {
    onClickApproveTask?.(id);
  }

  return {
    header: (
      <div style={{ fontSize: 20, cursor: 'pointer' }} onClick={_onClickChore}>
        {chore.name} ({chore.person?.name || 'unassigned'})
      </div>
    ),
    body: (
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
    ),
  };
}
