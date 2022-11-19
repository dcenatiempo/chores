import { ChangeEvent } from 'react';
import {
  ISOToTimestamp,
  timestampToISODate,
  UnixTimestamp,
} from '../../../libs/dateTime';
import InputField from '../InputField';
import styles from './DateSelector.module.css';

interface DateSelectorProps {
  id: string;
  label?: string;
  date?: UnixTimestamp;
  onChange: (date: UnixTimestamp) => void;
}

export function DateSelector({
  id,
  onChange,
  date,
  label = '',
}: DateSelectorProps) {
  function onChangeInner(e: ChangeEvent<HTMLInputElement>) {
    onChange(ISOToTimestamp(e.target.value));
  }
  return (
    <InputField label={label}>
      <input
        className={styles.dateSelector}
        type="date"
        id={id}
        name={id}
        onChange={onChangeInner}
        value={date ? timestampToISODate(date) : ''}
      />
    </InputField>
  );
}
