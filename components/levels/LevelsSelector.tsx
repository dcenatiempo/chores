import { FC } from 'react';
import { Level } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import MultiselectDropdown from '../base/MultiselectDropdown';

export interface LevelsSelectorProps {
  onSelect: (levels: Level[]) => void;
  selected: Level[];
  levels?: Level[];
}

const LevelsSelector: FC<LevelsSelectorProps> = ({
  onSelect,
  selected,
  levels,
}) => {
  const { levelsArray } = useCurrentOrg();
  return (
    <MultiselectDropdown
      label="Levels"
      valueKey={(level) => level?.id || ''}
      labelKey={(level) => level?.name || ''}
      options={levels || levelsArray}
      onSelect={onSelect}
      selected={selected}
      id="levels-multiselect"
    />
  );
};

export default LevelsSelector;
