import type { NextPage } from 'next';

import AddPeople from '../../components/people/AddPeople';
import { addPersonToOrg, updatePeopleFromOrg } from '../../libs/firebase';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import RoomsList from '../../components/rooms/RoomsList';
import AddRoom from '../../components/rooms/AddRoom';
import { Person } from '../../libs/store/models/orgs/types';
import { Button, Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';
import ThemeSelector from '../../components/ThemeSelector';

const Settings: NextPage = () => {
  return (
    <PageWrapper metaTitle="Chore Settings">
      <ThemeSelector />
    </PageWrapper>
  );
};

export default Settings;
