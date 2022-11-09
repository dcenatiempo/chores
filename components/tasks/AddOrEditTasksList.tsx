import { FC } from 'react';
import { Task } from '../../libs/store/models/orgs/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditTask from './AddOrEditTask';
import TaskListItem from './TaskListItem';

interface AddOrEditTasksListProps {
  tasks: Task[] | undefined;
  onClickAdd: (task: Task) => void;
  onClickDelete: (task: Task) => void;
  onClickEdit: (task: Task) => void;
}

const AddOrEditTasksList: FC<AddOrEditTasksListProps> = ({
  tasks = [],
  onClickAdd,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <AddOrEditList
      resources={tasks}
      addResource={onClickAdd}
      deleteResource={onClickDelete}
      editResource={onClickEdit}
      resourceName={'Task'}
      renderResource={(item) => <TaskListItem task={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      AddOrEditResource={AddOrEditTask}
    />
  );
};

export default AddOrEditTasksList;
