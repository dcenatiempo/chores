import type { NextPage } from 'next';

import { Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';

const Dashboard: NextPage = () => {
  return (
    <PageWrapper metaTitle="Chore Dashboard">
      <Card>hello</Card>
    </PageWrapper>
  );
};

export default Dashboard;
