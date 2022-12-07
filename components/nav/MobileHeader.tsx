import React from 'react';
import { LogInOutButton } from './Header';
import classes from './NavStyles.module.css';
import { useKidMode } from '../../libs/store/appState/useAppState';
import useUser from '../../libs/store/models/user/useUser';

interface Props {
  label: string;
}

export default function MobileHeader({ label }: Props) {
  const { isKidMode } = useKidMode();
  const { isAuthenticated } = useUser();
  return (
    <header className={classes.mobileHeader}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <div style={styles.title}>{label}</div>
        {!isKidMode || !isAuthenticated ? <LogInOutButton /> : null}
      </div>
    </header>
  );
}

const styles = {
  container: {
    flex: 'row',
    minHeight: 50,
  },
  title: {
    color: '#0070f3',
  },
};
