// https://react-icons.github.io/react-icons/icons?name=ri

import { FC, useMemo } from 'react';
import {
  RiEdit2Fill,
  RiEdit2Line,
  RiWheelchairFill,
  RiWheelchairLine,
  RiUserAddFill,
  RiUserAddLine,
  RiDeleteBinFill,
  RiDeleteBinLine,
} from 'react-icons/ri';
// import styles from './Icon.module.css';

type IconType = typeof RiEdit2Fill;
// size?: string | number;
// color?: string;
// title?: string;

export enum IconName {
  PLACEHOLDER = 'placeholder',
  EDIT = 'edit',
  ADD_PERSON = 'add_person',
  DELETE = 'delete',
  // CLOSE = 'close'
}

const IconMap = {
  EDIT_FILL: RiEdit2Fill,
  EDIT_LINE: RiEdit2Line,
  PLACEHOLDER_FILL: RiWheelchairFill,
  PLACEHOLDER_LINE: RiWheelchairLine,
  ADD_PERSON_FILL: RiUserAddFill,
  ADD_PERSON_LINE: RiUserAddLine,
  DELETE_FILL: RiDeleteBinFill,
  DELETE_LINE: RiDeleteBinLine,
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

const Icon: FC<IconProps> = ({ name, outlined = false, size = 16, color }) => {
  const TheIcon = useMemo(() => getIcon(name, outlined), [name, outlined]);
  const title = 'test title';

  if (!TheIcon) return null;
  if (color)
    return (
      <span className={`${color}-color`}>
        <TheIcon size={size} title={title} />
      </span>
    );

  return <TheIcon size={size} title={title} />;
};

export default Icon;
