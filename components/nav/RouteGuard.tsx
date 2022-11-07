import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';

import { useIsAuthenticated } from '../../libs/authentication';
import { useSelector } from 'react-redux';

const publicPaths = ['/', '/login'];

interface Props {
  children?: React.ReactNode;
}

export default function RouteGuard({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated, loading } = useIsAuthenticated();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setIsAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function isUserAllowedHere(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];

    return isAuthenticated || publicPaths.includes(path);
  }

  function authCheck(url: string) {
    if (loading) return;
    const path = url.split('?')[0];
    const isAllowed = isUserAllowedHere(url);
    if (!isAllowed) {
      setIsAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else if (isAuthenticated && path === '/login') {
      setIsAuthorized(true);
      router.push({
        pathname: '/household',
      });
    } else {
      setIsAuthorized(true);
    }
  }

  return isAuthorized ? <>{children}</> : null;
}
