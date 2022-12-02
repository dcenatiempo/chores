import { useEffect } from 'react';
import { useDarkMode } from '../../libs/store/appState/useAppState';

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

export default function ThemeListener() {
  const { isDark } = useDarkMode();

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;
    body.dataset.theme = isDark ? Theme.DARK : Theme.LIGHT;
  }, [isDark]);

  return null;
}

// https://medium.com/swlh/dark-mode-using-css-variables-cf065a7fa133
