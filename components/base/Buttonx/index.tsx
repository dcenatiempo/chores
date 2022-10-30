import { FC } from 'react';
import styles from './Button.module.css';

interface Props {
  label: string;
  onClick: () => void;
  type?: string;
}

const Button: FC<Props> = ({ label, onClick = () => {}, type = '' }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
