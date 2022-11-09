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

  return (
    <PageWrapper metaTitle="Chore Household">
      <AddOrEditChoresList
        chores={choresArray}
        onClickAdd={addChore}
        onClickDelete={deleteChore}
        onClickEdit={editChore}
      />
      <AddOrEditTasksList
        tasks={tasksArray}
        onClickAdd={addTask}
        onClickDelete={deleteTask}
        onClickEdit={editTask}
      />
      <AddOrEditPeopleList
        people={peopleArray}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
        onClickEdit={editPerson}
      />
      <AddOrEditRoomsList
        rooms={roomsArray}
        onClickAdd={addRoom}
        onClickDelete={deleteRoom}
        onClickEdit={editRoom}
      />
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
