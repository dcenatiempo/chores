import { FC } from 'react';
import { Chore, Person } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';

import { Dropdown } from '../base';
import Card from '../base/Card';
import ScheduleSelector, { ScheduledSelectorProps } from './ScheduleSelector';

export interface AddOrEditScheduledChoreProps extends ScheduledSelectorProps {
  personId?: string;
  setPersonId: (personId?: string) => void;
  choreId?: string;
  setChoreId: (choreId?: string) => void;
}

const AddOrEditScheduledChore: FC<AddOrEditScheduledChoreProps> = ({
  personId,
  setPersonId,
  choreId,
  setChoreId,
  ...scheduleSelectorProps
}) => {
  const { peopleArray, choresArray } = useCurrentOrg();

  function _setPersonId(person?: Person) {
    setPersonId(person?.id || '');
  }

  function _setChoreId(chore?: Chore) {
    setChoreId(chore?.id || '');
  }

  return (
    <Card>
      <Dropdown
        options={peopleArray}
        valueKey={(p) => `${p?.id || p}`}
        labelKey={(p) => `${p?.firstName} ${p?.lastName}`.trim()}
        id={'choose-person'}
        onSelect={_setPersonId}
        selected={personId}
        label={'Person'}
      />
      <Dropdown
        options={choresArray}
        valueKey={(c) => `${c?.id || c}`}
        labelKey={(c) => c?.name || ''}
        id={'choose-chore'}
        onSelect={_setChoreId}
        selected={choreId}
        label={'Chore'}
      />
      <ScheduleSelector {...scheduleSelectorProps} />
    </Card>
  );
};

export default AddOrEditScheduledChore;
