import { FC } from 'react';
import InputLabel from '../InputLabel';
import styles from './InputField.module.css';

export interface InputFieldProps {
  id?: string;
  label: string;
  inline?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
}

const InputField: FC<InputFieldProps> = ({
  errorMessage = '',
  label,
  id,
  inline,
  children,
}) => {
  const derivedId = id || label;
  return (
    <div className={`${styles.IiputField} ${inline ? styles.inline : ''}`}>
      <InputLabel id={derivedId}>{label}</InputLabel>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>
    </div>
  );
};

export default InputField;
