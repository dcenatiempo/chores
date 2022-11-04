import { FC } from 'react';
import { IconButton, IconButtonProps, IconName } from '../base';

export interface SaveButtonProps extends Omit<IconButtonProps, 'iconName'> {}

const SaveButton: FC<SaveButtonProps> = ({ ...rest }) => {
  return <IconButton {...rest} iconName={IconName.CHECK} />;
};

export default SaveButton;
