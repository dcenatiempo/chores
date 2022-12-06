import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from '../../../libs/hooks';
import InputField, { InputFieldProps } from '../InputField';
import styles from './MultiselectDropdown.module.css';

interface nativeDropdownProps<T> extends InputFieldProps {
  options: T[] | [];
  valueKey: (option: T) => string;
  labelKey: (option: T) => string;
  id: string;
  onSelect: (selected?: T) => void;
  selected: T | string | undefined;
  requireSelected?: boolean;
}

export default function NativeDropdown<T>({
  id,
  options,
  selected,
  onSelect,
  valueKey,
  labelKey,
  label,
  requireSelected = false,
}: nativeDropdownProps<T>) {
  const _valueKey = useCallback(
    (option: T | string | undefined) => {
      if (!option) return undefined;
      if (typeof option === 'string') return option;
      return valueKey(option);
    },
    [valueKey]
  );

  // this is because selected might just be the valueKey already
  const _selected = useMemo(() => _valueKey(selected), [_valueKey, selected]);

  // const filteredOptions = useMemo(() => {
  //   return options.filter((o) => {
  //     if (!show) return true;
  //     return labelKey(o).toLowerCase().includes(text.toLowerCase());
  //   });
  // }, [labelKey, options, show, text]);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const s = options.find((option) => e.target.value === _valueKey(option));
    onSelect(s);
  }

  return (
    <InputField label={label}>
      <select
        name={id}
        id={id}
        onChange={onChange}
        value={_selected}
        className={`${styles.textInput}`}
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
