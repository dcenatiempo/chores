import type { NextPage } from 'next';

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
