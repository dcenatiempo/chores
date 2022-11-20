import { FC, useState } from 'react';
import { UnixTimestamp } from '../../libs/dateTime';
import { Chore, Person } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { ScheduledChore } from '../../libs/store/models/scheduledChores/types';
import AddOrEditList from '../base/AddOrEditList';
import AddOrEditScheduledChore from './AddOrEditScheduledChores';
import ScheduledChoreListItem from './ScheduledChoreListItem';

interface AddOrEditScheduledChoresListProps {
  chores: ScheduledChore[] | undefined;
  addChore?: (chore: ScheduledChore) => void;
  deleteChore?: (chore: ScheduledChore) => void;
  editChore?: (chore: ScheduledChore) => void;
}

const AddOrEditScheduledChoresList: FC<AddOrEditScheduledChoresListProps> = ({
  chores = [],
  addChore,
  deleteChore,
  editChore,
}) => {
  const [scheduledChoreId, setScheduledChoreId] = useState('');
  const [personId, setPersonId] = useState<string>();
  const [choreId, setChoreId] = useState<string>();
  const [startDate, setStartDate] = useState<UnixTimestamp>(0);
  const [dueDate, setDueDate] = useState<UnixTimestamp>(0);
  const [frequency, setFrequency] = useState<number | undefined>(1);
  const [interval, setInterval] = useState<'week' | 'month' | undefined>(
    'week'
  );
  const [weekly, setWeekly] = useState<string>();
  const [monthly, setMonthly] = useState<'day' | 'date'>();

  const disabled = !isFormValid();

  function setForm(scheduledChore?: ScheduledChore) {
    setScheduledChoreId(scheduledChore?.id || '');
    setPersonId(scheduledChore?.personId || '');
    setChoreId(scheduledChore?.orgChoreId || '');
    setStartDate(scheduledChore?.schedule?.startDate || 0);
    setDueDate(scheduledChore?.schedule?.dueDate || 0);
    setFrequency(scheduledChore?.schedule?.frequency);
    setInterval(scheduledChore?.schedule?.interval);
    setWeekly(scheduledChore?.schedule?.weekly);
    setMonthly(scheduledChore?.schedule?.monthly);
  }

  function clearForm() {
    setScheduledChoreId('');
    setPersonId('');
    setChoreId('');
    setStartDate(0);
    setDueDate(0);
    setFrequency(undefined);
    setInterval(undefined);
    setWeekly(undefined);
    setMonthly(undefined);
  }

  function isFormValid() {
    if (!choreId) return false;
    if (!personId) return false;
    if (!frequency) return false;
    if (!interval) return false;
    if (!weekly && !monthly) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (chore: ScheduledChore) => void) {
    if (!isFormValid()) return;
    clearForm();
    callback?.({
      id: scheduledChoreId,
      orgChoreId: choreId,
      personId: personId,
      schedule: {
        startDate,
        dueDate,
        frequency,
        interval,
        weekly,
        monthly,
      },
    } as ScheduledChore);
  }

  function _onClickAdd() {
    onClickAddOrSave(addChore);
  }
  function _onClickEdit() {
    onClickAddOrSave(editChore);
  }
  function _onClickDelete(chore: ScheduledChore) {
    deleteChore?.(chore);
  }
  return (
    <AddOrEditList
      resources={chores}
      onClickAdd={addChore ? _onClickAdd : undefined}
      onClickSave={editChore ? _onClickEdit : undefined}
      onClickDelete={deleteChore ? _onClickDelete : undefined}
      resourceName={'Scheduled Chore'}
      renderResource={(item) => <ScheduledChoreListItem chore={item} />}
      keyExtractor={(resource) => `${resource.id}`}
      disabled={disabled}
      addOrEditResource={
        <AddOrEditScheduledChore
          personId={personId}
          setPersonId={setPersonId}
          choreId={choreId}
          setChoreId={setChoreId}
          startDate={startDate}
          setStartDate={setStartDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          frequency={frequency}
          setFrequency={setFrequency}
          interval={interval}
          setInterval={setInterval}
          weekly={weekly}
          setWeekly={setWeekly}
          monthly={monthly}
          setMonthly={setMonthly}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditScheduledChoresList;
