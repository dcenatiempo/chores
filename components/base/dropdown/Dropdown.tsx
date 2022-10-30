import { ChangeEvent } from 'react';

interface DropdownProps<T> {
  options: T[];
  value: (option: T | undefined) => string;
  label: (option: T | undefined) => string;
  id: string;
  onSelect: (selected: T | undefined) => void;
  selected: T | undefined;
}

export default function Dropdown<T>({
  id,
  options,
  selected,
  onSelect,
  value,
  label,
}: DropdownProps<T>) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const s = options.find((option) => e.target.value === value(option));
    onSelect(s);
  }
  return (
    <select name={id} id={id} onChange={onChange} value={value(selected)}>
      {options.map((option) => {
        const v = value(option);
        const l = label(option);
        if (!value || !label) return null;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  );
}
