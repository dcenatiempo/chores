// import { ChangeEvent } from 'react';
// import InputField, { InputFieldProps } from '../InputField';

// interface MultiselectDropdownProps<T> extends InputFieldProps {
//   options: T[];
//   valueKey: (option: T | undefined) => string;
//   labelKey: (option: T | undefined) => string;
//   id: string;
//   onSelect: (selected: T[]) => void;
//   selected: T[] | [];
// }

// export default function MultiselectDropdown<T>({
//   id,
//   options,
//   selected,
//   onSelect,
//   valueKey,
//   labelKey,
//   label,
// }: MultiselectDropdownProps<T>) {
//   function onChange(e: ChangeEvent<HTMLSelectElement>) {
//     var allOptions = e.target.options;
//     var values = [];
//     for (var i = 0, l = allOptions.length; i < l; i++) {
//       if (allOptions[i].selected) {
//         const s = options.find(
//           (option) => allOptions[i].value === valueKey(option)
//         );
//         if (s) values.push(s);
//       }
//     }

//     onSelect(values);
//   }

//   const selectedValues = selected.map((option) => valueKey(option));
//   return (
//     <InputField label={label}>
//       <select
//         name={id}
//         id={id}
//         onChange={onChange}
//         value={selectedValues}
//         multiple
//       >
//         {options.map((option) => {
//           const v = valueKey(option);
//           const l = labelKey(option);
//           if (!v || !l) return null;
//           return (
//             <option key={v} value={v}>
//               {l}
//             </option>
//           );
//         })}
//       </select>
//     </InputField>
//   );
// }

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useInterval } from '../../../libs/hooks';
import Button from '../Button';
import { IconName } from '../Icon';
import IconButton from '../IconButton';
import InputField, { InputFieldProps } from '../InputField';
import styles from './MultiselectDropdown.module.css';

interface MultiselectDropdownProps<T> extends InputFieldProps {
  options: T[];
  valueKey: (option: T) => string;
  labelKey: (option: T) => string;
  id: string;
  onSelect: (selected: T[]) => void;
  selected: T[] | string[];
  requireSelected?: boolean;
}

export default function MultiselectDropdown<T>({
  id,
  options,
  selected,
  onSelect,
  valueKey,
  labelKey,
  label,
  requireSelected = false,
}: MultiselectDropdownProps<T>) {
  const _valueKey = useCallback(
    (option: T | string) => {
      if (typeof option === 'string') return option;
      return valueKey(option);
    },
    [valueKey]
  );

  // this is because selected might just be the valueKey already
  const _selected = useMemo(
    () =>
      (selected as any[]).reduce<T[]>((acc, s) => {
        const option = options.find((o) => _valueKey(o) === _valueKey(s));
        if (option) return [option, ...acc];
        return acc;
      }, []),
    [_valueKey, options, selected]
  );

  const _selectedValues = useMemo(
    () => _selected.map((s) => _valueKey(s)),
    [_selected, _valueKey]
  );

  const [textIsFocused, setTextIsFocused] = useState<boolean>(false);
  const [itemIsFocused, setItemIsFocused] = useState<boolean | null>(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((o) => {
      if (!show) return true;
      return labelKey(o).toLowerCase().includes(text.toLowerCase());
    });
  }, [labelKey, options, show, text]);

  useEffect(() => {
    if (!_selected) setText('');
  }, [_selected]);

  useInterval(
    () => {
      setShow(false);
      setTextIsFocused(false);
      setItemIsFocused(null);
      setText('');
    },
    show && !textIsFocused && !itemIsFocused ? 20 : null
  );

  function selectOrDeselectItem(option: T) {
    const isSelected = _selectedValues.includes(_valueKey(option));
    if (requireSelected && isSelected) return;
    return isSelected ? deselectItem(option) : selectItem(option);
  }

  function selectItem(item: T) {
    // setItemIsFocused(false);
    const newSelected = [item, ..._selected];
    onSelect(newSelected);
  }

  function deselectItem(item: T) {
    // setItemIsFocused(false);
    onSelect(_selected.filter((s) => valueKey(s) !== valueKey(item)));
  }
  function onKeypress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      if (text.length) setText('');
      else {
        // @ts-expect-error
        document?.activeElement?.blur?.();
      }
    }
    if (e.key === 'Enter') {
      if (filteredOptions.length === 1) {
        selectOrDeselectItem(filteredOptions[0]);
        setText('');
      }
    }
  }

  useEffect(() => {
    function callback(e: globalThis.KeyboardEvent) {
      if (!show) return;
      if (e.key === 'Escape') {
        setItemIsFocused(false);
        // @ts-expect-error
        document?.activeElement?.blur?.();
      }
    }

    window.addEventListener('keyup', callback);

    return () => {
      window.removeEventListener('keyup', callback);
    };
  }, [show]);

  return (
    <InputField label={label}>
      <div
        className={`${styles.textInput} ${textIsFocused ? styles.focused : ''}`}
      >
        {_selected.map((item) => (
          <Tag
            key={valueKey(item)}
            label={labelKey(item)}
            onRemove={
              !requireSelected || _selected.length > 1
                ? () => deselectItem(item)
                : undefined
            }
          />
        ))}
        <input
          className={styles.textInputReset}
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
      </div>

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
            const isSelected = _selectedValues.includes(v);

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
                  onClick={() => selectOrDeselectItem(option)}
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

interface TagProps {
  onRemove?: () => void;
  label: string;
}
function Tag<T>({ onRemove, label }: TagProps) {
  return (
    <div className={styles.tag}>
      {label}
      <IconButton
        disabled={!onRemove}
        className={styles.tagRemove}
        style={{
          visibility: !onRemove ? 'hidden' : undefined,
        }}
        type="invisible"
        iconName={IconName.X}
        onClick={() => onRemove?.()}
      />
    </div>
  );
}
