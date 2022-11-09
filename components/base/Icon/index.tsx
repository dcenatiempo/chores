// https://react-icons.github.io/react-icons/icons?name=ri

import { FC, useMemo } from 'react';
import * as ri from 'react-icons/ri';
// import styles from './Icon.module.css';

type IconType = typeof ri.RiEdit2Fill;
// size?: string | number;
// color?: string;
// title?: string;

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
  tooltipTitle?: string;
}

const Icon: FC<IconProps> = ({
  name,
  outlined = false,
  size = 16,
  color,
  tooltipTitle,
}) => {
  const TheIcon = useMemo(() => getIcon(name, outlined), [name, outlined]);

  if (!TheIcon) return null;
  if (color)
    return (
      <span className={`${color}-color`}>
        <TheIcon size={size} title={tooltipTitle} />
      </span>
    );

  return <TheIcon size={size} title={tooltipTitle} />;
};

export default Icon;

export enum IconName {
  PLACEHOLDER = 'PLACEHOLDER',
  PENCIL = 'PENCIL', // pencil
  TRASH = 'TRASH', // trash
  PLUS = 'PLUS', // +
  MINUS = 'MINUS', // -
  CHECK = 'CHECK', // ✓
  X = 'X', // x
  ADD_PERSON = 'ADD_PERSON',
  SETTINGS = 'SETTINGS',
  STAR = 'STAR',
  STAR_HALF = 'STAR_HALF',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

const IconMap = {
  PENCIL_FILL: ri.RiEdit2Fill,
  PENCIL_LINE: ri.RiEdit2Line,
  PLACEHOLDER_FILL: ri.RiWheelchairFill,
  PLACEHOLDER_LINE: ri.RiWheelchairLine,
  ADD_PERSON_FILL: ri.RiUserAddFill,
  ADD_PERSON_LINE: ri.RiUserAddLine,
  TRASH_FILL: ri.RiDeleteBinFill,
  TRASH_LINE: ri.RiDeleteBinLine,
  PLUS_FILL: ri.RiAddFill,
  PLUS_LINE: ri.RiAddLine,
  MINUS_FILL: ri.RiSubtractFill,
  MINUS_LINE: ri.RiSubtractLine,
  CHECK_FILL: ri.RiCheckFill,
  CHECK_LINE: ri.RiCheckLine,
  X_FILL: ri.RiCloseFill,
  X_LINE: ri.RiCloseLine,
  SETTINGS_FILL: ri.RiSettings4Fill,
  SETTINGS_LINE: ri.RiSettings4Line,
  STAR_FILL: ri.RiStarFill,
  STAR_LINE: ri.RiStarLine,
  STAR_HALF_FILL: ri.RiStarHalfFill,
  STAR_HALF_LINE: ri.RiStarHalfLine,
  LOGIN_FILL: ri.RiLoginBoxFill,
  LOGIN_LINE: ri.RiLoginBoxLine,
  LOGOUT_FILL: ri.RiLogoutBoxRFill,
  LOGOUT_LINE: ri.RiLogoutBoxRLine,
};
