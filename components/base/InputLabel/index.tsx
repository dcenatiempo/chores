import { FC } from 'react';
import styles from './InputLabel.module.css';

export interface InputLabelProps {
  children: React.ReactNode;
  id: string;
}

const InputLabel: FC<InputLabelProps> = ({ children, id }) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  );
};

export default InputLabel;
