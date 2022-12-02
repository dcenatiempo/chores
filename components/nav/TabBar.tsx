import { Button, IconButton, IconName } from '../base';
import { useRouter } from 'next/router';
import { useKidMode } from '../../libs/store/appState/useAppState';
import useUser from '../../libs/store/models/user/useUser';
import React from 'react';
import Link from 'next/link';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';

interface Props {}

export default function TabBar({}: Props) {
  return (
    <footer style={styles.container}>
      <NavigationButtons />
    </footer>
  );
}

const styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 'row',
    height: 50,
  },
  title: {
    color: '#0070f3',
  },
};

function NavigationButtons() {
  const { isKidMode } = useKidMode();
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const tabs = React.useMemo(() => {
    if (isKidMode) return ['schedule', 'settings'];
    return ['dashboard', 'household', 'chores', 'schedule', 'settings'];
  }, [isKidMode]);

  if (!isAuthenticated) return null;
  return (
    <>
      {tabs.map((tab) => (
        <Button
          key={tab}
          type="sentance"
          onClick={() => router.push(tab)}
          label={tab}
          disabled={router.asPath.includes(tab)}
        />
      ))}
    </>
  );
}
