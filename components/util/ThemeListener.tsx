import { useEffect } from 'react';
import useAppState from '../../libs/store/appState/useAppState';

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

export default function ThemeListener() {
  const { isDark } = useAppState();

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;
    body.dataset.theme = isDark ? Theme.DARK : Theme.LIGHT;
  }, [isDark]);

  return null;
}
