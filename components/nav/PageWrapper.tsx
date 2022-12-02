import { FC } from 'react';

import Header from '../../components/nav/Header';
import styles from './styles.module.css';
import Footer from '../../components/nav/Footer';
import Head, { HeadProps } from './Head';
import RouteGuard from './RouteGuard';
import { useScreenSize } from '../../libs/store/appState/useAppState';
import TabBar from './TabBar';

interface PageWrapperProps extends HeadProps {
  children: React.ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, ...rest }) => {
  const { isSmallScreen, screenWidth } = useScreenSize();
  if (isSmallScreen)
    return (
      <div className={styles.mobileContainer}>
        <Head {...rest} />
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
      screenSize = {screenWidth}
      <RouteGuard>
        <main className={styles.webMain}>{children}</main>
      </RouteGuard>
      <Footer />
    </div>
  );
};

export default PageWrapper;
