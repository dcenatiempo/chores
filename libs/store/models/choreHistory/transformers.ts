import { cleanFromObject } from '../../../utils';
import { Level, Person, Room, TaskTemplate } from '../orgs/types';
import { RoomType } from '../roomTypes/types';
import {
  FBTask,
  FeedChore,
  ScheduledChore,
  Task,
} from '../scheduledChores/types';
import { transformTimestamp } from '../sharedTransformers';
import { Map } from '../types';
import { HistoryChore, FBHistoryChore } from './types';

export const transformHistoryChore = {
  toFB(historyChore: HistoryChore): FBHistoryChore {
    return historyChore;
  },
  fromFB(historyChore: FBHistoryChore): HistoryChore {
    return historyChore;
  },
  hydrate: hydrateHistoryChore,
};

export function hydrateHistoryChore(
  historyChore: HistoryChore,
  scheduledChores: Map<ScheduledChore>,
  people: Map<Person>,
  taskTemplates: Map<TaskTemplate>,
  levels: Map<Level>,
  roomTypes: Map<RoomType>,
  rooms: Map<Room>
): FeedChore | null {
  const scheduledChore = scheduledChores[historyChore.scheduledChoreId];
  if (!scheduledChore) return null;
  const schedule = {
    ...scheduledChore.schedule,
    startDate: transformTimestamp.fromFB(historyChore.startDate),
    dueDate: transformTimestamp.fromFB(historyChore.dueDate),
  };

  const scheduledPerson = scheduledChore.personId
    ? people[scheduledChore.personId]
    : undefined;
  const historyPerson = historyChore.personId
    ? people[historyChore.personId]
    : undefined;
  const person = historyPerson || scheduledPerson;
  return cleanFromObject(
    {
      id: historyChore.id,
      idType: 'ChoreHistory',
      scheduledChoreId: scheduledChore.id,
      name: scheduledChore.name,
      schedule,
      tasks: scheduledChore.tasks.map((t) =>
        hydrateHistoryChoreTask(
          t,
          historyChore.taskIdsCompleted,
          historyChore.taskIdsApproved,
          taskTemplates,
          levels,
          roomTypes,
          rooms
        )
      ),
      person,
      levels: scheduledChore.levelIds?.map((id) => levels[id]),
      roomTypes: scheduledChore.roomTypeIds?.map((id) => roomTypes[id]),
      rooms: scheduledChore.roomIds?.map((id) => rooms[id]),
    },
    [undefined]
  );
}
export function hydrateHistoryChoreTask(
  scheduledChoreTask: FBTask,
  taskIdsCompleted: string[],
  taskIdsApproved: string[],
  taskTemplates: Map<TaskTemplate>,
  levels: Map<Level>,
  roomTypes: Map<RoomType>,
  rooms: Map<Room>
): Task {
  const taskTemplate = taskTemplates?.[scheduledChoreTask.taskTemplateId];
  const _levels = scheduledChoreTask.levelIds?.map((lid) => levels[lid]);
  const _roomTypes = scheduledChoreTask.roomTypeIds?.map(
    (rtid) => roomTypes[rtid]
  );
  const _rooms = scheduledChoreTask.roomIds?.map((rid) => rooms[rid]);
  const _completed = taskIdsCompleted.includes(scheduledChoreTask.id);
  const _approved = !!taskIdsApproved?.includes(scheduledChoreTask.id);
  return {
    id: scheduledChoreTask.id,
    taskTemplate,
    levels: _levels,
    roomTypes: _roomTypes,
    rooms: _rooms,
    completed: _completed,
    approved: _approved,
  };
}
