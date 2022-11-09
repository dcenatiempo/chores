import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import Dropdown from '../base/Dropdown';

export interface LevelSelectorProps {
  onSelect: (level: Level | undefined) => void;
  selected: Level | undefined;
}

const LevelSelector: FC<LevelSelectorProps> = ({ onSelect, selected }) => {
  const { levelsArray } = useCurrentOrg();
  return (
    <Dropdown
      label="Level"
      valueKey={(level) => level?.id || ''}
      labelKey={(level) => level?.name || ''}
      options={levelsArray}
      onSelect={onSelect}
      selected={selected}
      id="roomTypes"
    />
  );
};

export default LevelSelector;
