import type { NextPage } from 'next';
import KidModeSelector from '../../components/KidModeSelector';

import PageWrapper from '../../components/nav/PageWrapper';
import ThemeSelector from '../../components/ThemeSelector';
import useUser from '../../libs/store/models/user/useUser';

const SettingsPage: NextPage = () => {
  const { isAuthenticated } = useUser();

  return (
    <PageWrapper metaTitle="Chore Settings">
      <ThemeSelector />
      {isAuthenticated ? <KidModeSelector /> : null}
    </PageWrapper>
  );
};

export default SettingsPage;
