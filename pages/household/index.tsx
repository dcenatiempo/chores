import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditPeopleList from '../../components/people/AddOrEditPeopleList';
import AddOrEditRoomsList from '../../components/rooms/AddOrEditRoomsList';
import AddOrEditLevelsList from '../../components/levels/AddOrEditLevelsList';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';
import AddOrEditChoresList from '../../components/chores/AddOrEditChoresList';

const Household: NextPage = () => {
  const {
    peopleArray,
    roomsArray,
    tasksArray,
    tasks,
    choresArray,
    levelsArray,
    addPerson,
    deletePerson,
    deleteRoom,
    addRoom,
    editRoom,
    editPerson,
    addLevel,
    deleteLevel,
    editLevel,
    addTask,
    deleteTask,
    editTask,
    addChore,
    deleteChore,
    editChore,
  } = useCurrentOrg();
  console.log(tasksArray, tasks);
  const showRooms = !!levelsArray.length;
  const showChores = !!tasksArray.length && !!peopleArray.length;
  const showTasks = !!roomsArray.length && !!peopleArray.length;

  return (
    <PageWrapper metaTitle="Chore Household">
      {showChores ? (
        <AddOrEditChoresList
          chores={choresArray}
          onClickAdd={addChore}
          onClickDelete={deleteChore}
          onClickEdit={editChore}
        />
      ) : null}
      {showTasks ? (
        <AddOrEditTasksList
          tasks={tasksArray}
          onClickAdd={addTask}
          onClickDelete={deleteTask}
          onClickEdit={editTask}
        />
      ) : null}
      <AddOrEditPeopleList
        people={peopleArray}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
        onClickEdit={editPerson}
      />
      {showRooms ? (
        <AddOrEditRoomsList
          rooms={roomsArray}
          onClickAdd={addRoom}
          onClickDelete={deleteRoom}
          onClickEdit={editRoom}
        />
      ) : null}
      <AddOrEditLevelsList
        levels={levelsArray}
        onClickAdd={addLevel}
        onClickDelete={deleteLevel}
        onClickEdit={editLevel}
      />
    </PageWrapper>
  );
};

export default Household;
