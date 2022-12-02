import { FC } from 'react';
import { useDarkMode } from '../../libs/store/appState/useAppState';
import { Switch } from '../base';
import styles from './ThemeSelector.module.css';

export interface ThemeSelectorProps {
  children?: React.ReactNode;
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ children }) => {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <div className={styles.themeSelector}>
      Dark Mode
      <Switch value={isDark} onChange={setIsDark} />
    </div>
  );
};

export default ThemeSelector;
