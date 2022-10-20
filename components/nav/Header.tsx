import { FC } from 'react';
import Head from 'next/head';
import { logout, useIsAuthenticated } from '../../libs/authentication';
import { Button } from '../base';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { organizationsStore } from '../../libs/store';

interface Props {}

const Header: FC<Props> = () => {
  const orgName = useSelector(organizationsStore.selectors.name);

  return (
    <div style={styles.container}>
      <Head>
        <title>Chores are FUN!</title>
        <meta name="description" content="Making choes fun again" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    <Button onClick={logout} label="Logout" />
  ) : (
    <Button
      onClick={() =>
        router.push({
          pathname: '/login',
        })
      }
      label="Login"
    />
  );
};
