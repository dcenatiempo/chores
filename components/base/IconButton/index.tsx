import { FC } from 'react';
import Button, { ButtonType } from '../Button';
import Icon, { IconColor, IconName } from '../Icon';
import styles from './IconButton.module.css';

export interface IconButtonProps {
  iconName: IconName;
  size?: number;
  outlined?: boolean;
  color?: IconColor;
  onClick: () => void;
  disabled?: boolean;
  type?: ButtonType;
  onFocus?: () => void;
  onBlur?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  iconName,
  size = 20,
  outlined = false,
  color = IconColor.BASIC,
  onClick,
  disabled = false,
  type = 'fill',
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      color={color}
      disabled={disabled}
      {...rest}
    >
      <Icon name={iconName} size={size} outlined={outlined} />
    </Button>
  );
};

export default IconButton;
