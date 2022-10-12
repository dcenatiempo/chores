import { FC } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label: string;
  inLine?: boolean;
  isPrivate?: boolean;
  type?: 'password'
  errorMessage?: string
}

const TextInput: FC<TextInputProps> = ({ errorMessage = '', label, id, type, value, onChange = () => {} }) => {
  const derivedId = id || label;
  return (<div className={styles.textInput}>
    <label htmlFor={derivedId} className={styles.label}>
      {label}
      </label>

      <div style={{ display: 'flex', flexDirection: 'column'}}><input
        type={type || ''}
        id={derivedId}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <span className={styles.errorMessage}>{errorMessage}</span>
      </div>

      </div>
  );
};

export default TextInput;
