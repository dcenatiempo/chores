import { Button } from '../base';
import { useRouter } from 'next/router';
import { useKidMode } from '../../libs/store/appState/useAppState';
import useUser from '../../libs/store/models/user/useUser';
import React from 'react';
import styles from './NavStyles.module.css';

interface Props {}

export default function TabBar({}: Props) {
  return (
    <footer className={styles.tabBar}>
      <NavigationButtons />
    </footer>
  );
}

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
