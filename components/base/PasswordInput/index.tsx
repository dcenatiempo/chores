import { FC } from 'react';
import TextInput, { TextInputProps } from '../TextInput';
// import styles from './PasswordInput.module.css';

interface Props extends TextInputProps {}

const PasswordInput: FC<Props> = ({ ...props }) => {
  return <TextInput type="password" {...props} />;
};

export default PasswordInput;
