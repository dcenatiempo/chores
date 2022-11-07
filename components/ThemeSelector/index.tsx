import { FC, useEffect } from 'react';
import useAppState from '../../libs/store/appState/useAppState';
import { Switch } from '../base';
import styles from './ThemeSelector.module.css';

export interface ThemeSelectorProps {
  children?: React.ReactNode;
}

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ children }) => {
  const { isDark, setIsDark } = useAppState();

  useEffect(() => {
    const app = document.querySelector('#__next');
    if (!app) return;
    // @ts-expect-error
    app.dataset.theme = isDark ? Theme.DARK : Theme.LIGHT;
  }, [isDark]);

  return (
    <div className={styles.themeSelector}>
      Dark Mode
      <Switch value={isDark} onChange={setIsDark} />
    </div>
  );
};

export default ThemeSelector;