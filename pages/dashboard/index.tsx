import type { NextPage } from 'next';

import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { Card } from '../../components/base';
import PageWrapper from '../../components/nav/PageWrapper';

const Dashboard: NextPage = () => {
  const { org, addPerson, deletePerson } = useCurrentOrg();

  return (
    <PageWrapper metaTitle="Chore Dashboard">
      <Card>hello</Card>
    </PageWrapper>
  );
};

export default Dashboard;
