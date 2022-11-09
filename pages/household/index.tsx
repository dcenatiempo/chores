import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import PageWrapper from '../../components/nav/PageWrapper';
import AddOrEditPeopleList from '../../components/people/AddOrEditPeopleList';
import AddOrEditRoomsList from '../../components/rooms/AddOrEditRoomsList';
import AddOrEditLevelsList from '../../components/levels/AddOrEditLevelsList';
import AddOrEditTasksList from '../../components/tasks/AddOrEditTasksList';

const Household: NextPage = () => {
  const {
    people,
    rooms,
    tasks,
    levels,
    addPerson,
    deletePerson,
    deleteRoom,
    addRoom,
    editRoom,
    editPerson,
    addLevel,
    deleteLevel,
    addTask,
    deleteTask,
    editTask,
  } = useCurrentOrg();

  return (
    <PageWrapper metaTitle="Chore Household">
      <AddOrEditTasksList
        tasks={tasks}
        onClickAdd={addTask}
        onClickDelete={deleteTask}
        onClickEdit={editTask}
      />
      <AddOrEditPeopleList
        people={people}
        onClickAdd={addPerson}
        onClickDelete={deletePerson}
        onClickEdit={editPerson}
      />
      <AddOrEditRoomsList
        rooms={rooms}
        onClickAdd={addRoom}
        onClickDelete={deleteRoom}
        onClickEdit={editRoom}
      />
      <AddOrEditLevelsList
        levels={levels}
        onClickAdd={addLevel}
        onClickDelete={deleteLevel}
        // onClickEdit={editLevel}
      />
    </PageWrapper>
  );
};

export default Household;
