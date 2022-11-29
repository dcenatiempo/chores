import type { NextPage } from 'next';
import KidModeSelector from '../../components/KidModeSelector';

import PageWrapper from '../../components/nav/PageWrapper';
import ThemeSelector from '../../components/ThemeSelector';

const Settings: NextPage = () => {
  return (
    <PageWrapper metaTitle="Chore Settings">
      <ThemeSelector />
      <KidModeSelector />
    </PageWrapper>
  );
};

export default Settings;
