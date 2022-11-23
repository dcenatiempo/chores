import { FC, useMemo } from 'react';
import { IconColor } from '../Icon';
import styles from './Button.module.css';

export type ButtonType = 'fill' | 'outline' | 'sentance' | 'invisible';

export interface ButtonProps {
  style?: object;
  disabled?: boolean;
  label?: string;
  onClick: () => void;
  children?: React.ReactNode;
  type?: ButtonType;
  color?: IconColor;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Button: FC<ButtonProps> = ({
  disabled,
  color = IconColor.BASIC,
  type = 'fill',
  children,
  label,
  onClick = () => {},
  ...rest
}) => {
  const style = useMemo(() => {
    const globalColorStyle = `${color}-color`;
    const localColorStyle = styles?.[`${color}-color`];

    const colorStyle = type === 'fill' ? localColorStyle : globalColorStyle;
    const disabledStyle = disabled ? 'disabled' : '';
    const buttonStyle = styles.button;
    const typeStyle = styles?.[type];
    const invisibleStyle = styles.invisible;

    if (type === 'invisible') return `${buttonStyle} ${invisibleStyle}`;

    return `${buttonStyle} ${typeStyle} ${disabledStyle} ${colorStyle}`;
  }, [type, disabled, color]);

  return (
    <button className={style} onClick={onClick} disabled={disabled} {...rest}>
      {label}
      {/* todo: no children, just icon? */}
      <div style={{ paddingLeft: label ? 10 : 0 }}>{children}</div>
    </button>
  );
};

export default Button;
