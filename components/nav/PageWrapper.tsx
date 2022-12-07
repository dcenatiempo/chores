import { FC } from 'react';

import Header from '../../components/nav/Header';
import styles from './NavStyles.module.css';
import Footer from '../../components/nav/Footer';
import Head, { HeadProps } from './Head';
import RouteGuard from './RouteGuard';
import { useScreenSize } from '../../libs/store/appState/useAppState';
import TabBar from './TabBar';
import MobileHeader from './MobileHeader';
import { useRouter } from 'next/router';
import { capitalize } from '../../libs/utils';

interface PageWrapperProps extends HeadProps {
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, ...rest }) => {
  const { isSmallScreen, screenWidth } = useScreenSize();
  const r = useRouter();

  if (isSmallScreen)
    return (
      <div className={styles.mobileContainer}>
        <Head {...rest} />
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }}
        >
          <MobileHeader label={capitalize(r.route.substring(1))} />
        </div>
        <RouteGuard>
          <main className={styles.mobileMain}>{children}</main>
        </RouteGuard>
        <TabBar />
      </div>
    );

  return (
    <div className={styles.webContainer}>
      <Head {...rest} />
      <Header />
      <RouteGuard>
        <main className={styles.webMain}>{children}</main>
      </RouteGuard>
      <Footer />
    </div>
  );
};

export default PageWrapper;
