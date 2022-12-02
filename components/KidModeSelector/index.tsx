import { FC, useState } from 'react';
import { useKidMode } from '../../libs/store/appState/useAppState';
import { IconButton, IconName, PasswordInput, Switch } from '../base';
import Modal from '../base/Modal';
import styles from './KidModeSelector.module.css';

export interface ThemeSelectorProps {
  children?: React.ReactNode;
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ children }) => {
  const { isKidMode, toggleKidMode } = useKidMode();
  const [pin, setPin] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  function onChange(val: boolean) {
    setShowModal(true);
  }

  function onClick() {
    const success = toggleKidMode(pin);
    if (success) setShowModal(false);
    setPin('');
  }

  return (
    <div className={styles.themeSelector}>
      Kid Mode
      <Switch value={isKidMode} onChange={onChange} />
      <Modal
        onClose={() => {
          setShowModal(false);
          setPin('');
        }}
        title={'enter pin'}
        visible={showModal}
      >
        <PasswordInput value={pin} onChange={setPin} label={''} />
        <IconButton onClick={onClick} iconName={IconName.CHECK} />
      </Modal>
    </div>
  );
};

export default ThemeSelector;
