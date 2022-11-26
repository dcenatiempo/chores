import { cleanFromObject } from '../../../utils';
import { Level, Person, Room, TaskTemplate } from '../orgs/types';
import { RoomType } from '../roomTypes/types';
import {
  FBTask,
  FeedChore,
  ScheduledChore,
  Task,
} from '../scheduledChores/types';
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
): FeedChore {
  const scheduledChore = scheduledChores[historyChore.id];
  const schedule = {
    ...scheduledChore.schedule,
    startDate: historyChore.startDate,
    dueDate: historyChore.dueDate,
  };
  return cleanFromObject(
    {
      id: historyChore.id,
      idType: 'HistoryChore',
      name: scheduledChore.name,
      schedule,
      tasks: scheduledChore.tasks.map((t) =>
        hydrateHistoryChoreTask(
          t,
          historyChore.taskIdsCompleted,
          taskTemplates,
          levels,
          roomTypes,
          rooms
        )
      ),
      person: people[scheduledChore.personId],
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
  taskTemplates: Map<TaskTemplate>,
  levels: Map<Level>,
  roomTypes: Map<RoomType>,
  rooms: Map<Room>
): Task {
  const taskTemplate = taskTemplates[scheduledChoreTask.taskTemplateId];
  const _levels = scheduledChoreTask.levelIds?.map((lid) => levels[lid]);
  const _roomTypes = scheduledChoreTask.roomTypeIds?.map(
    (rtid) => roomTypes[rtid]
  );
  const _rooms = scheduledChoreTask.roomIds?.map((rid) => rooms[rid]);
  const _completed = taskIdsCompleted.includes(scheduledChoreTask.id);
  return {
    id: scheduledChoreTask.id,
    taskTemplate,
    levels: _levels,
    roomTypes: _roomTypes,
    rooms: _rooms,
    completed: _completed,
  };
}
