import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';
import AddOrEditChoresList from '../../components/chores/AddOrEditChoresList';

const Household: NextPage = () => {
  const {
    peopleArray,
    roomsArray,
    tasksArray,
    choresArray,
    addTask,
    deleteTask,
    editTask,
    addChore,
    deleteChore,
    editChore,
  } = useCurrentOrg();

  const showChores = !!tasksArray.length && !!peopleArray.length;
  const showTasks = !!roomsArray.length && !!peopleArray.length;

  return (
    <PageWrapper metaTitle="Chore Household">
      {showChores ? (
        <AddOrEditChoresList
          chores={choresArray}
          addChore={addChore}
          deleteChore={deleteChore}
          editChore={editChore}
        />
      ) : null}
      {showTasks ? (
        <AddOrEditTasksList
          tasks={tasksArray}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ) : null}
    </PageWrapper>
  );
};

export default Household;
