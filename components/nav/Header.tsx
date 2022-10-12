import { FC } from 'react';
import Head from 'next/head';

interface Props {}

const Header: FC<Props> = () => {
  return (
    <div style={styles.container}>
      <Head>
        <title>Chores are FUN!</title>
        <meta name="description" content="Making choes fun again" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 style={styles.title}>
          Cenatiempo Kids Chores
        </h1>
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
