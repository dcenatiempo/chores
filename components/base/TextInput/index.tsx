import { FC } from 'react';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import styles from './TextInput.module.css';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label: string;
  inline?: boolean;
  isPrivate?: boolean;
  type?: 'password';
  errorMessage?: string;
  children: React.ReactNode;
}

const TextInput: FC<TextInputProps> = ({
  errorMessage = '',
  label,
  id,
  inline,
  type,
  onChange,
  value,
}) => {
  const derivedId = id || label;
  return (
    <InputField
      id={id || label}
      label={label}
      inline={inline}
      errorMessage={errorMessage}
    >
      <input
        type={type || ''}
        id={derivedId}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </InputField>
  );
};

export default TextInput;
