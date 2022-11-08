import { FC } from 'react';

import Header from '../../components/nav/Header';
import styles from './styles.module.css';
import Footer from '../../components/nav/Footer';
import Head, { HeadProps } from './Head';
import RouteGuard from './RouteGuard';

interface PageWrapperProps extends HeadProps {
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.container}>
      <Head {...rest} />

      <Header />
      <RouteGuard>
        <main className={styles.main}>{children}</main>
      </RouteGuard>

      <Footer />
    </div>
  );
};

export default PageWrapper;
