import { FC } from 'react';
import { IconButton, IconButtonProps, IconName } from '../base';

export interface AddButtonProps extends Omit<IconButtonProps, 'iconName'> {}

const AddButton: FC<AddButtonProps> = ({ ...rest }) => {
  return <IconButton {...rest} iconName={IconName.PLUS} />;
};

export default AddButton;
