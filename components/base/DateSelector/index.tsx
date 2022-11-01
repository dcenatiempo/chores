import { ChangeEvent, ChangeEventHandler } from 'react';

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
    <input
      type="date"
      id={id}
      name={id}
      onChange={onChangeInner}
      value={date}
    />
  );
}
