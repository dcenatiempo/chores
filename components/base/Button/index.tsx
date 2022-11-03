import { FC } from 'react';
import IconType from '../Icon';
import styles from './Button.module.css';

interface Props {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<Props> = ({ children, label, onClick = () => {} }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
      {children}
    </button>
  );
};

export default Button;
