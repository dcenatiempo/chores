import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../libs/store/store';
import Firebase from '../components/util/Firebase';
import ThemeListener from '../components/util/ThemeListener';
import ScreenSizeListener from '../components/util/ScreenSizeListener';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeListener />
      <Firebase />
      <ScreenSizeListener />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
