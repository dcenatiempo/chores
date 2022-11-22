import { FC } from 'react';
import { Action } from '../../libs/store/models/actions/types';
import useActions from '../../libs/store/models/actions/useActions';
import Dropdown from '../base/Dropdown';

export interface ActionsSelectorProps {
  onSelect: (roomType: Action | undefined) => void;
  selected: Action | undefined;
  actions?: Action[];
}

const ActionsSelector: FC<ActionsSelectorProps> = ({
  onSelect,
  selected,
  actions,
}) => {
  const { actionsArray } = useActions();
  return (
    <div>
      <Dropdown
        label="Actions"
        valueKey={(option) => option?.name || ''}
        labelKey={(option) => option?.name || ''}
        options={actions || actionsArray}
        onSelect={onSelect}
        selected={selected}
        id="actions"
      />
    </div>
  );
};

export default ActionsSelector;
