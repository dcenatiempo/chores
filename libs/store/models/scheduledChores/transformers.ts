import { Chore, Person } from '../orgs/types';
import { Map } from '../types';
import { FBScheduledChore, FeedChore, ScheduledChore } from './types';

export const transformScheduledScheduledChore = {
  toFB(scheduledChore: ScheduledChore): FBScheduledChore {
    return scheduledChore;
  },
  fromFB(scheduledChore: FBScheduledChore): ScheduledChore {
    return scheduledChore;
  },
  hydrade(
    scheduledChore: ScheduledChore,
    Chores: Map<Chore>,
    People: Map<Person>
  ): FeedChore {
    return {
      ...scheduledChore,
      orgChore: Chores[scheduledChore.orgChoreId],
      person: People[scheduledChore.personId],
    };
  },
};
