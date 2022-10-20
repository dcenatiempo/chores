import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import RouteGuard from '../components/nav/RouteGuard';
import store from '../libs/store/store';
import Firebase from '../components/util/Firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Firebase />
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}

export default MyApp;
