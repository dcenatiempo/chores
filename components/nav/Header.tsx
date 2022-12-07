import { logout } from '../../libs/authentication';
import { Button, IconButton, IconName } from '../base';
import { useRouter } from 'next/router';
import {
  useKidMode,
  useScreenSize,
} from '../../libs/store/appState/useAppState';
import useUser from '../../libs/store/models/user/useUser';
import React from 'react';
import Link from 'next/link';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { isAuthenticated } from '../../libs/store/models/user/selectors';

interface Props {}

function Header({}: Props) {
  const { orgName } = useCurrentOrg();
  const { isKidMode } = useKidMode();
  const { isAuthenticated } = useUser();

  return (
    <header style={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Link href={'/'} passHref>
          <a>
            <h1 style={styles.title}>{orgName} Chores</h1>
          </a>
        </Link>
        {!isKidMode || !isAuthenticated ? <LogInOutButton /> : null}
      </div>
      <NavigationButtons />
    </header>
  );
}

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

export function LogInOutButton() {
  const router = useRouter();
  const { isAuthenticated } = useUser();

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
}

function NavigationButtons() {
  const { isKidMode } = useKidMode();
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const tabs = React.useMemo(() => {
    if (!isAuthenticated) return ['settings'];
    if (isKidMode) return ['schedule', 'settings'];
    return ['household', 'chores', 'schedule', 'settings'];
  }, [isKidMode, isAuthenticated]);
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
}
