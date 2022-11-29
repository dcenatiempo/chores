import { FC } from 'react';
import { logout, useIsAuthenticated } from '../../libs/authentication';
import { Button, IconButton, IconName } from '../base';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { orgsStore } from '../../libs/store';
import useAppState from '../../libs/store/appState/useAppState';

interface Props {}

const Header: FC<Props> = () => {
  const orgName = useSelector(orgsStore.selectors.name);

  return (
    <header style={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={styles.title}>{orgName} Chores</h1>
        <LogInOutButton />
      </div>
      <NavigationButtons />
    </header>
  );
};

export default Header;

const styles = {
  container: {
    flex: 'row',
    minHeight: 50,
  },
  title: {
    color: '#0070f3',
  },
};

const LogInOutButton: FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useIsAuthenticated();
  if (router.asPath.startsWith('/login')) return null;
  return isAuthenticated ? (
    <IconButton
      onClick={logout}
      type="sentance"
      iconName={IconName.LOGOUT}
      outlined
      size={36}
    />
  ) : (
    <IconButton
      type="sentance"
      onClick={() =>
        router.push({
          pathname: '/login',
        })
      }
      iconName={IconName.LOGIN}
      outlined
      size={36}
    />
  );
};

const NavigationButtons: FC = () => {
  const { isKidMode } = useAppState();
  const router = useRouter();
  const tabs = isKidMode
    ? ['schedule', 'settings']
    : ['dashboard', 'household', 'chores', 'schedule', 'settings'];
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {tabs.map((tab) => (
        <Button
          key={tab}
          type="sentance"
          onClick={() => router.push(tab)}
          label={tab}
          disabled={router.asPath.includes(tab)}
        />
      ))}
    </div>
  );
};
