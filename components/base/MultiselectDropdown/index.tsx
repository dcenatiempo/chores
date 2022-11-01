import { ChangeEvent } from 'react';
import InputField, { InputFieldProps } from '../InputField';

interface MultiselectDropdownProps<T> extends InputFieldProps {
  options: T[];
  valueKey: (option: T | undefined) => string;
  labelKey: (option: T | undefined) => string;
  id: string;
  onSelect: (selected: T[]) => void;
  selected: T[] | [];
}

export default function MultiselectDropdown<T>({
  id,
  options,
  selected,
  onSelect,
  valueKey,
  labelKey,
  label,
}: MultiselectDropdownProps<T>) {
  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    // const s = options.find((option) => e.target.options === valueKey(option));
    // console.log(e.target.options);
    // onSelect(s);

    var allOptions = e.target.options;
    var values = [];
    for (var i = 0, l = allOptions.length; i < l; i++) {
      if (allOptions[i].selected) {
        const s = options.find(
          (option) => allOptions[i].value === valueKey(option)
        );
        if (s) values.push(s);
      }
    }

    onSelect(values);
  }

  const selectedValues = selected.map((option) => valueKey(option));
  return (
    <InputField label={label}>
      <select
        name={id}
        id={id}
        onChange={onChange}
        value={selectedValues}
        multiple
      >
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
