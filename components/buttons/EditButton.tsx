import { FC } from 'react';
import { IconButton, IconButtonProps, IconName } from '../base';

export interface EditButtonProps extends Omit<IconButtonProps, 'iconName'> {}

const EditButton: FC<EditButtonProps> = ({ ...rest }) => {
  return <IconButton {...rest} iconName={IconName.PENCIL} />;
};

export default EditButton;
