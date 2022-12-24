import { FC, useState } from 'react';
import { UnixTimestamp } from '../../libs/dateTime';
import { Room, Level } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import { ScheduledChore } from '../../libs/store/models/scheduledChores/types';
import useScheduledChores from '../../libs/store/models/scheduledChores/useScheduledChores';
import { mapToArray } from '../../libs/store/models/sharedTransformers';
import { cleanFromObject } from '../../libs/utils';
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
  const [scheduledChoreName, setScheduledChoreName] = useState('');
  const [personId, setPersonId] = useState<string>();
  const [choreTemplateId, setChoreTemplateId] = useState<string>();
  const [startDate, setStartDate] = useState<UnixTimestamp>(0);
  const [dueDate, setDueDate] = useState<UnixTimestamp>(0);
  const [frequency, setFrequency] = useState<number | undefined>(1);
  const [interval, setInterval] = useState<'week' | 'month' | undefined>(
    'week'
  );
  const [weekly, setWeekly] = useState<string>();
  const [monthly, setMonthly] = useState<'day' | 'date'>();

  const [taskIds, setTaskIds] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const { chores: choresMap, rooms: roomsMap } = useCurrentOrg();
  const { getNextId } = useScheduledChores();

  const disabled = !isFormValid();

  function setForm(scheduledChore?: ScheduledChore) {
    const choreName = scheduledChore?.name || '';
    const taskIds = scheduledChore?.tasks.map((t) => t.taskTemplateId) || [];

    setScheduledChoreId(scheduledChore?.id || '');
    setScheduledChoreName(choreName);
    setTaskIds(taskIds);
    setPersonId(scheduledChore?.personId || '');
    setStartDate(scheduledChore?.schedule?.startDate || 0);
    setDueDate(scheduledChore?.schedule?.dueDate || 0);
    setFrequency(scheduledChore?.schedule?.frequency);
    setInterval(scheduledChore?.schedule?.interval);
    setWeekly(scheduledChore?.schedule?.weekly);
    setMonthly(scheduledChore?.schedule?.monthly);

    setRooms(scheduledChore?.roomIds?.map((id) => roomsMap[id]) || []);
  }

  function clearForm() {
    setScheduledChoreId('');
    setPersonId('');
    setChoreTemplateId('');
    setStartDate(0);
    setDueDate(0);
    setFrequency(undefined);
    setInterval(undefined);
    setWeekly(undefined);
    setMonthly(undefined);
  }

  function isFormValid() {
    // if (!choreTemplateId) return false;
    // if (!personId) return false;
    if (!frequency) return false;
    if (!interval) return false;
    if (!weekly && !monthly) return false;
    return true;
  }

  function onClickAddOrSave(callback?: (chore: ScheduledChore) => void) {
    if (!isFormValid()) return;
    clearForm();
    const tasks = taskIds.map((id) => ({
      id: getNextId(),
      taskTemplateId: id,
    }));
    callback?.(
      cleanFromObject(
        {
          id: scheduledChoreId,
          name: scheduledChoreName,
          tasks,
          personId: personId,
          schedule: {
            startDate,
            dueDate,
            frequency,
            interval,
            weekly,
            monthly,
          },
          levelIds: !levels.length ? undefined : levels.map((l) => l.id),
          roomTypeIds: !roomTypes.length
            ? undefined
            : roomTypes.map((r) => r.id),
          roomIds: !rooms.length ? undefined : rooms.map((r) => r.id),
        },
        [undefined]
      ) as ScheduledChore
    );
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
  function _setChoreTemplateId(id?: string) {
    setChoreTemplateId(id);
    if (!id) return setTaskIds([]);

    const choreTemplate = choresMap[id];
    setScheduledChoreName(
      choreTemplate?.name || `missing chore template id: ${choreTemplate.id}`
    );
    setTaskIds(mapToArray(choreTemplate?.taskTemplates)?.map((t) => t.id));
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
          choreTemplateId={choreTemplateId}
          setChoreTemplateId={_setChoreTemplateId}
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
          setRooms={setRooms}
          levels={levels}
          rooms={rooms}
          roomTypes={roomTypes}
          setLevels={setLevels}
          setRoomTypes={setRoomTypes}
          taskTemplateIds={taskIds}
          choreName={scheduledChoreName}
          setChoreName={setScheduledChoreName}
        />
      }
      setResourceToEdit={setForm}
    />
  );
};

export default AddOrEditScheduledChoresList;
