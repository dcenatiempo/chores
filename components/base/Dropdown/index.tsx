import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useInterval } from '../../../libs/hooks';
import { Map } from '../../../libs/store/models/types';
import Button from '../Button';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import InputField, { InputFieldProps } from '../InputField';
import TextInput from '../TextInput';
import styles from './Dropdown.module.css';

interface DropdownProps<T> extends InputFieldProps {
  options: T[];
  valueKey: (option: T | undefined) => string;
  labelKey: (option: T | undefined) => string;
  id: string;
  onSelect: (selected: T | undefined) => void;
  selected: T | string | undefined;
}

function Dropdown<T>({
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
      <select
        className={styles.select}
        name={id}
        id={id}
        onChange={onChange}
        value={valueKey(selected) || selected}
      >
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

interface DropdownProps<T> extends InputFieldProps {
  options: T[];
  valueKey: (option: T | undefined) => string;
  labelKey: (option: T | undefined) => string;
  id: string;
  onSelect: (selected: T | undefined) => void;
  selected: T | string | undefined;
}

export default function Dropdown2<T>({
  id,
  options,
  selected,
  onSelect,
  valueKey,
  labelKey,
  label,
}: DropdownProps<T>) {
  const [textIsFocused, setTextIsFocused] = useState<boolean>(false);
  const [itemIsFocused, setItemIsFocused] = useState<boolean | null>(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState(labelKey(selected));
  const filteredOptions = useMemo(() => {
    return options.filter((o) =>
      labelKey(o).toLowerCase().includes(text.toLowerCase())
    );
  }, [labelKey, options, text]);

  useEffect(() => {
    if (!selected) setText('');
  }, [selected]);
  useInterval(
    () => {
      setShow(false);
      setTextIsFocused(false);
      setItemIsFocused(null);
      setText(labelKey(selected));
    },
    show && !textIsFocused && !itemIsFocused ? 20 : null
  );

  const selectedValue = valueKey(selected);

  function selectItem(item: T) {
    setItemIsFocused(false);
    onSelect(item);
  }

  function deselectItem(item: T) {
    setItemIsFocused(false);
    onSelect(undefined);
  }

  function onKeypress(e: KeyboardEvent) {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      if (filteredOptions.length === 1) {
        selectItem(filteredOptions[0]);
        setItemIsFocused(false);
        setTextIsFocused(false);
      }
    }
  }

  return (
    <InputField label={label}>
      {selected ? (
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <IconButton
            type="sentance"
            iconName={IconName.X}
            onClick={() => {
              setText('');
              onSelect(undefined);
            }}
          />
        </div>
      ) : null}
      <input
        className={styles.textInput}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onFocus={() => {
          setText('');
          setTextIsFocused(true);
          setShow(true);
        }}
        onBlur={() => setTextIsFocused(false)}
        onKeyUp={onKeypress}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 1,
        }}
      >
        <ul
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            maxHeight: '25vh',
            overflow: 'scroll',
            position: 'absolute',
            display: show ? undefined : 'none',
            margin: 0,
            paddingTop: 2,
            marginTop: 2,
            top: 0,
            width: '100%',
          }}
          className={styles.select}
          id={id}
        >
          {filteredOptions.map((option) => {
            const v = valueKey(option);
            const l = labelKey(option);
            const isSelected = v === selectedValue;

            if (!v || !l) return null;
            return (
              <li key={v} value={v}>
                <Button
                  style={{
                    width: '100%',
                    justifyContent: 'start',
                    backgroundColor: isSelected ? 'grey' : undefined,
                  }}
                  type="invisible"
                  onClick={() =>
                    isSelected ? deselectItem(option) : selectItem(option)
                  }
                  onFocus={() => setItemIsFocused(true)}
                  onBlur={() => setItemIsFocused(false)}
                  label={l}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </InputField>
  );
}
