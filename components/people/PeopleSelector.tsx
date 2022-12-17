import { useMemo } from 'react';
import { Person } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { Dropdown } from '../base';
import MultiselectDropdown from '../base/MultiselectDropdown';

interface Props {
  peopleOptions?: Person[];
  selected: Person[];
  onSelect: (people: Person[]) => void;
  label?: string;
}

export default function PeopleSelector({
  peopleOptions,
  selected,
  onSelect,
  label = 'Filter by People',
}: Props) {
  const { peopleArray } = useCurrentOrg();
  const _peopleOptions = useMemo(
    () => peopleOptions || peopleArray,
    [peopleArray, peopleOptions]
  );

  return (
    <Dropdown
      options={_peopleOptions}
      valueKey={(o) => o?.id || ''}
      labelKey={(o) => o?.firstName || ''}
      id={'people-selector'}
      onSelect={(person) => onSelect(person ? [person] : [])}
      selected={selected ? selected[0] : undefined}
      label={label}
    />
  );
}
