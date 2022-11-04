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
  date?: UnixTimestamp;
  onChange: (date: UnixTimestamp) => void;
}

export function DateSelector({ id, onChange, date }: DateSelectorProps) {
  function onChangeInner(e: ChangeEvent<HTMLInputElement>) {
    onChange(ISOToTimestamp(e.target.value));
  }
  return (
    <InputField label={'Birthday'}>
      <input
        className={styles.dateSelector}
        type="date"
        id={id}
        name={id}
        onChange={onChangeInner}
        value={date ? timestampToISODate(date) : date}
      />
    </InputField>
  );
}
