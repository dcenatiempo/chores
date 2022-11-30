import type { NextPage } from 'next';
import Link from 'next/link';
import PageWrapper from '../components/nav/PageWrapper';
import useUser from '../libs/store/models/user/useUser';
import styles from './Home.module.css';

const HomePage: NextPage = () => {
  const { isAuthenticated } = useUser();
  return (
    <PageWrapper metaTitle="">
      <h1 className={styles.title}>Welcome to Chore App</h1>

      <p className={styles.description}>A household chore management app</p>
      {!isAuthenticated ? (
        <p className={styles.description}>
          <Link href="/login">
            <a>Please Register or Login</a>
          </Link>
        </p>
      ) : null}
    </PageWrapper>
  );
};

export default HomePage;
