import { FC } from 'react';
import { IconColor } from '../Icon';
import styles from './Button.module.css';

export type ButtonType = 'fill' | 'outline' | 'sentance';

export interface ButtonProps {
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  children?: React.ReactNode;
  type?: ButtonType;
  color?: IconColor;
}

const Button: FC<ButtonProps> = ({
  disabled,
  color = IconColor.BASIC,
  type = 'fill',
  children,
  label,
  onClick = () => {},
}) => {
  const fillStyle =
    type === 'fill' ? styles?.[`${color}-color`] : `${color}-color`;
  return (
    <button
      className={`${fillStyle} ${styles.button} ${styles?.[type]} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {/* todo: no children, just icon? */}
      <div style={{ paddingLeft: label ? 10 : 0 }}>{children}</div>
    </button>
  );
};

export default Button;
