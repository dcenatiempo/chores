import { FC } from 'react';
import useCurrentOrg from '../../libs/store/slices/orgs/useCurrentOrg';
import Dropdown from '../base/Dropdown';

export interface LevelSelectorProps {
  onSelect: (level: string | undefined) => void;
  selected: string | undefined;
}

const LevelSelector: FC<LevelSelectorProps> = ({ onSelect, selected }) => {
  const { org } = useCurrentOrg();
  const levels = org.levels || [];
  return (
    <Dropdown
      label="Level"
      valueKey={(option) => option || ''}
      labelKey={(option) => option || ''}
      options={levels}
      onSelect={onSelect}
      selected={selected}
      id="roomTypes"
    />
  );
};

export default LevelSelector;