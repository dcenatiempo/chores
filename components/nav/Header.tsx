import { FC } from 'react';
import Head from 'next/head';
import { logout, useIsAuthenticated } from '../../libs/authentication';
import { Button, Icon, IconButton, IconColor, IconName } from '../base';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { organizationsStore } from '../../libs/store';
import ThemeSelector from '../ThemeSelector';

interface Props {}

const Header: FC<Props> = () => {
  const orgName = useSelector(organizationsStore.selectors.name);

  return (
    <div style={styles.container}>
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
    </div>
  );
};

export default Header;

const styles = {
  container: {
    flex: 'row',
    height: 50,
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
  const router = useRouter();
  const tabs = ['dashboard', 'household', 'settings'];
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
