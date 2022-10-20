import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../libs/firebase';
import { store } from '../libs/redux/store';
import { Provider } from 'react-redux';
import RouteGuard from '../components/nav/RouteGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}

export default MyApp;
