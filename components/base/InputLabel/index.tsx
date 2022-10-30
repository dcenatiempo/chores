import { FC } from 'react';
import styles from './InputLabel.module.css';

export interface InputLabelProps {
  label: string;
  id: string;
}

const InputLabel: FC<InputLabelProps> = ({ label, id }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
  );
};

export default InputLabel;
