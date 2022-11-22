import { FC } from 'react';
import { getTaskName } from '../../libs/store/models/orgs/transformers';
import { TaskTemplate } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton } from '../buttons';

interface TaskListItemProps {
  task: TaskTemplate;
  onClickDelete?: (task: TaskTemplate) => void;
  onClickEdit?: (task: TaskTemplate) => void;
}
const TaskListItem: FC<TaskListItemProps> = ({
  task,
  onClickDelete,
  onClickEdit,
}) => {
  function onClickDeleteTask() {
    onClickDelete?.(task);
  }

  function onClickEditTask() {
    onClickEdit?.(task);
  }

  return (
    <ListItem>
      {getTaskName(task)}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        {onClickEdit ? <EditButton disabled onClick={onClickEditTask} /> : null}
        {onClickDelete ? <DeleteButton onClick={onClickDeleteTask} /> : null}
      </div>
    </ListItem>
  );
};

export default TaskListItem;
