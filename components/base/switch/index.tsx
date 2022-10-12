import { FC } from 'react';
import styles from './Switch.module.css';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  type?: 'square' | 'round';
}

const Switch: FC<Props> = ({ value, onChange = () => {}, type = 'round' }) => {
  return (
    <label className={styles.switch}>
      <input
        checked={value}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`${styles.slider} ${type === 'round' ? styles.round : ''}`}
      ></span>
    </label>
  );
};

export default Switch;
