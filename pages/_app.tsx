import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../libs/store/store';
import Firebase from '../components/util/Firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Firebase />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
