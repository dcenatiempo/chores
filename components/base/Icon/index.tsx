// https://react-icons.github.io/react-icons/icons?name=ri

import { FC, useMemo } from 'react';
import {
  RiEdit2Fill,
  RiEdit2Line,
  RiWheelchairFill,
  RiWheelchairLine,
} from 'react-icons/ri';
import styles from './Icon.module.css';

type IconType = typeof RiEdit2Fill;
// size?: string | number;
// color?: string;
// title?: string;

export enum IconName {
  PLACEHOLDER = 'placeholder',
  EDIT = 'edit',
  // DELETE = 'delete',
  // CLOSE = 'close'
}

const IconMap = {
  EDIT_FILL: RiEdit2Fill,
  EDIT_LINE: RiEdit2Line,
  PLACEHOLDER_FILL: RiWheelchairFill,
  PLACEHOLDER_LINE: RiWheelchairLine,
};

function getIcon(type: IconName, outlined: boolean = false): IconType | null {
  const fillType = outlined ? 'LINE' : 'FILL';
  const key = `${type.toUpperCase()}_${fillType}`;
  const placeHolderKey = `${IconName.PLACEHOLDER.toUpperCase()}_${fillType}`;
  // @ts-expect-error
  const TheIcon: IconType = IconMap?.[key] || IconMap?.[placeHolderKey];
  return TheIcon || null;
}

export enum IconColor {
  BASIC = 'basic',
  WARN = 'warn',
  DANGER = 'danger',
  ACTION = 'action',
  SUCCESS = 'success',
  PRIMARY = 'primary',
}

export interface IconProps {
  name: IconName;
  outlined?: boolean;
  size?: number;
  color?: IconColor;
}

const Icon: FC<IconProps> = ({
  name,
  outlined = false,
  size = 16,
  color = IconColor.BASIC,
}) => {
  const TheIcon = useMemo(() => getIcon(name, outlined), [name, outlined]);
  const title = 'test title';

  if (!TheIcon) return null;
  return (
    <span className={styles?.[`${color}-color`]}>
      <TheIcon size={size} title={title} />
    </span>
  );
};

export default Icon;
