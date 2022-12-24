import { cleanFromObject } from '../../../utils';
import { getTaskName } from '../orgs/transformers';
import { Level, Person, Room, TaskTemplate } from '../orgs/types';
import { RoomType } from '../roomTypes/types';
import { transformTimestamp } from '../sharedTransformers';
import { Map } from '../types';
import {
  FBSchedule,
  FBScheduledChore,
  FBTask,
  FeedChore,
  Schedule,
  ScheduledChore,
  Task,
  UIChoreFeedItem,
} from './types';

export const transformScheduledChore = {
  toFB(scheduledChore: ScheduledChore): FBScheduledChore {
    const startDate = transformTimestamp.toFB(
      scheduledChore.schedule.startDate || 0
    );
    const dueDate = transformTimestamp.toFB(
      scheduledChore.schedule.dueDate || 0
    );
    const schedule = cleanFromObject<FBSchedule>(
      {
        ...scheduledChore.schedule,
        startDate,
        dueDate,
      },
      [undefined]
    );
    return {
      ...scheduledChore,
      schedule,
    };
  },
  fromFB(scheduledChore: FBScheduledChore): ScheduledChore {
    const startDate = transformTimestamp.fromFB(
      scheduledChore.schedule.startDate
    );
    const dueDate = transformTimestamp.fromFB(scheduledChore.schedule.dueDate);
    const schedule = cleanFromObject<Schedule>(
      {
        ...scheduledChore.schedule,
        startDate,
        dueDate,
      },
      [undefined]
    );

    return {
      ...scheduledChore,
      schedule,
    };
  },
  hydrate: hydrateScheduledChore,
};

export function hydrateScheduledChore(
  scheduledChore: ScheduledChore,
  people: Map<Person>,
  taskTemplates: Map<TaskTemplate>,
  levels: Map<Level>,
  roomTypes: Map<RoomType>,
  rooms: Map<Room>
): FeedChore {
  const person = scheduledChore.personId
    ? people[scheduledChore.personId]
    : undefined;
  return cleanFromObject(
    {
      id: scheduledChore.id,
      idType: 'ScheduledChore',
      scheduledChoreId: scheduledChore.id,
      name: scheduledChore.name,
      schedule: scheduledChore.schedule,
      tasks: scheduledChore.tasks.map((t) =>
        hydrateScheduledChoreTask(t, taskTemplates, levels, roomTypes, rooms)
      ),
      person,
      levels: scheduledChore.levelIds?.map((id) => levels[id]),
      roomTypes: scheduledChore.roomTypeIds?.map((id) => roomTypes[id]),
      rooms: scheduledChore.roomIds?.map((id) => rooms[id]),
    },
    [undefined]
  );
}
export function hydrateScheduledChoreTask(
  task: FBTask,
  taskTemplates: Map<TaskTemplate>,
  levels: Map<Level>,
  roomTypes: Map<RoomType>,
  rooms: Map<Room>
): Task {
  const taskTemplate = taskTemplates?.[task.taskTemplateId];
  const _levels = task.levelIds?.map((lid) => levels[lid]);
  const _roomTypes = task.roomTypeIds?.map((rtid) => roomTypes[rtid]);
  const _rooms = task.roomIds?.map((rid) => rooms[rid]);
  const _completed = false; // choreTask in flight will have this property
  return {
    id: task.id,
    taskTemplate,
    levels: _levels,
    roomTypes: _roomTypes,
    rooms: _rooms,
    completed: _completed,
  };
}

export function getUIChoreFeedItem(chore: FeedChore): UIChoreFeedItem {
  const person = chore.person
    ? {
        id: chore.person.id,
        name: chore.person.firstName,
        color: chore.person.color,
      }
    : undefined;
  return {
    id: chore.id,
    idType: chore.idType,
    name: chore.name,
    tasks: Object.values(chore.tasks).map((t) => ({
      name: getTaskName(t),
      id: t.id,
      completed: !!t.completed,
      approved: t.approved,
    })),
    person,
  };
}
