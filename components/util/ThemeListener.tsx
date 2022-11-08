import { useEffect } from 'react';
import useAppState from '../../libs/store/appState/useAppState';

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

export default function ThemeListener() {
  const { isDark } = useAppState();

  useEffect(() => {
    const app = document.querySelector('#__next');
    if (!app) return;
    // @ts-expect-error
    app.dataset.theme = isDark ? Theme.DARK : Theme.LIGHT;
  }, [isDark]);

  return null;
}
