import { ChangeEvent } from 'react';
import InputField, { InputFieldProps } from '../InputField';

interface DropdownProps<T> extends InputFieldProps {
  options: T[];
  valueKey: (option: T | undefined) => string;
  labelKey: (option: T | undefined) => string;
  id: string;
  onSelect: (selected: T | undefined) => void;
  selected: T | undefined;
}

export default function Dropdown<T>({
  id,
  options,
  selected,
  onSelect,
  valueKey,
  labelKey,
  label,
}: DropdownProps<T>) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const s = options.find((option) => e.target.value === valueKey(option));
    onSelect(s);
  }
  return (
    <InputField label={label}>
      <select name={id} id={id} onChange={onChange} value={valueKey(selected)}>
        <option key={undefined} value={undefined}>
          please select...
        </option>
        {options.map((option) => {
          const v = valueKey(option);
          const l = labelKey(option);
          if (!v || !l) return null;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
    </InputField>
  );
}
