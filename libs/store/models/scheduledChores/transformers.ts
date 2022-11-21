import ScheduledChoreListItem from '../../../../components/chores/ScheduledChoreListItem';
import { cleanFromObject } from '../../../utils';
import { getTaskName } from '../orgs/transformers';
import { Chore, Person } from '../orgs/types';
import { transformTimestamp } from '../sharedTransformers';
import { Map } from '../types';
import {
  FBSchedule,
  FBScheduledChore,
  FeedChore,
  Schedule,
  ScheduledChore,
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
  hydrate(
    scheduledChore: ScheduledChore,
    Chores: Map<Chore>,
    People: Map<Person>
  ): FeedChore {
    return {
      id: scheduledChore.id,
      schedule: scheduledChore.schedule,
      orgChore: Chores[scheduledChore.orgChoreId],
      person: People[scheduledChore.personId],
    };
  },
};

export function getUIChoreFeedItem(
  chore: FeedChore,
  chores: Map<Chore>
): UIChoreFeedItem {
  return {
    id: chore.id,
    name: chore.orgChore.name,
    tasks: Object.values(chore.orgChore.tasks).map((t) => ({
      name: getTaskName(t, chores[chore.id]),
      id: t.id,
      finished: false,
    })),
    person: {
      id: chore.person.id,
      name: chore.person.firstName,
    },
  };
}
