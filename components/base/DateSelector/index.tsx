import { ChangeEvent } from 'react';
import InputField from '../InputField';
import styles from './DateSelector.module.css';

interface DateSelectorProps {
  id: string;
  date: string;
  onChange: (date: string) => void;
}

export function DateSelector({ id, onChange, date }: DateSelectorProps) {
  function onChangeInner(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <InputField label={'Birthday'}>
      <input
        className={styles.dateSelector}
        type="date"
        id={id}
        name={id}
        onChange={onChangeInner}
        value={date}
      />
    </InputField>
  );
}
