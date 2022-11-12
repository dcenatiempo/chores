import { FC } from 'react';
import { Task } from '../../libs/store/models/orgs/types';
import { ListItem } from '../base';
import { EditButton, DeleteButton, AddButton } from '../buttons';

interface TaskListItemProps {
  task: Task;
  onClickDelete?: (task: Task) => void;
  onClickEdit?: (task: Task) => void;
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
      {task.action.name} {task.room?.name || task.roomType?.name}{' '}
      {task.surface?.name || task.surfaceTemplate?.name}
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
