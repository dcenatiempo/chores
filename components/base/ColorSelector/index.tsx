import { ChangeEvent } from 'react';
import InputField from '../InputField';
import styles from './colorSelector.module.css';

interface ColorSelectorProps {
  id: string;
  label?: string;
  color?: string;
  onChange: (color: string) => void;
}

export function ColorSelector({
  id,
  onChange,
  color = '',
  label = 'Color',
}: ColorSelectorProps) {
  function onChangeInner(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <InputField label={label}>
      <input
        className={styles.colorSelector}
        type="color"
        id={id}
        name={id}
        onChange={onChangeInner}
        value={color || ''}
      />
    </InputField>
  );
}
