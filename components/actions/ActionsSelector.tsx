import { FC } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import useActions from '../../libs/store/models/actions/useActions';
import Dropdown from '../base/Dropdown';

export interface ActionsSelectorProps {
  onSelect: (roomType: Action | undefined) => void;
  selected: Action | undefined;
}

const ActionsSelector: FC<ActionsSelectorProps> = ({ onSelect, selected }) => {
  const { actions } = useActions();
  return (
    <div>
      <Dropdown
        label="Actions"
        valueKey={(option) => option?.name || ''}
        labelKey={(option) => option?.name || ''}
        options={actions}
        onSelect={onSelect}
        selected={selected}
        id="actions"
      />
    </div>
  );
};

export default ActionsSelector;
