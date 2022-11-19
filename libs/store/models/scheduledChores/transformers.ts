import { cleanFromObject } from '../../../utils';
import { Chore, Person } from '../orgs/types';
import { transformTimestamp } from '../sharedTransformers';
import { Map } from '../types';
import {
  FBSchedule,
  FBScheduledChore,
  FeedChore,
  Schedule,
  ScheduledChore,
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
