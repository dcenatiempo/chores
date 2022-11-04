import { FC } from 'react';
import { IconButton, IconButtonProps, IconName } from '../base';

export interface DeleteButtonProps extends Omit<IconButtonProps, 'iconName'> {}

const DeleteButton: FC<DeleteButtonProps> = ({ ...rest }) => {
  return <IconButton {...rest} iconName={IconName.TRASH} />;
};

export default DeleteButton;
