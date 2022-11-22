import { UnixTimestamp } from '../../../dateTime';
import { FBTimestamp } from '../../../firebase';
import {
  ChoreTemplate,
  Level,
  Person,
  Room,
  TaskTemplate,
} from '../orgs/types';
import { RoomType } from '../roomTypes/types';
import { BaseSlice, Map } from '../types';

/**
 *   - startDate === dueDate - shows up on specific calendar day
 *   - startDate === undefined, dueDate === undefined - shows up on list of things that need to be done - not on calendar. If due date is in calendar, shows up as multidate calendar item
 *   - startDate, dueDate === undefined - if calendar in range, shows up on list of things that need to be done - not on calendar
 *   - startDate === undefined, dueDate - if due date not past, shows up on list of things that need to be done - not on calendar.  If due date is in calendar, shows up as multidate calendar item
 *   - startDate, dueDate - if neither date in calendar range, does not show up. if dueDate in range, shows as multi-day calendar item. if start date in range, but not due date, shows up on list of things that need to be done - not on calendar
 *
 *   3 visualizations of chores
 *   A) Single Day Calendar Chores
 *   B) Multi Day Calendar Chores (due date in range)
 *   C) Non Calendar Chores (due date not in range, but start date is)
 */
export interface Schedule {
  // dueDate - startDate gives a day range. frequency x duration must be shorter that day range
  startDate: UnixTimestamp | undefined; // if undefined, cannot repeat weekly
  dueDate: UnixTimestamp | undefined; // if undefined, can not repeat
  frequency: number; // weekly 1-4, monthly 1-12
  interval: 'week' | 'month';
  weekly?: string; // MTWHFSU
  monthly?: 'day' | 'date'; // 'day' = the 4th thursday of every month, 'date' = the 27th of every month
}

export interface FBSchedule {
  // dueDate - startDate gives a day range. frequency x duration must be shorter that day range
  startDate: FBTimestamp | undefined; // if undefined, cannot repeat weekly
  dueDate: FBTimestamp | undefined; // if undefined, can not repeat
  frequency: number; // weekly 1-4, monthly 1-12
  interval: 'week' | 'month';
  weekly?: string; // MTWHFSU
  monthly?: 'day' | 'date'; // 'day' = the 4th thursday of every month, 'date' = the 27th of every month
}

export interface FBTask {
  id: string;
  taskTemplateId: string;
  // in whole organiztion OR

  // in these specific levels
  levelIds?: string[];
  // in these types of rooms
  roomTypeIds?: string[];

  // AND in these specific rooms
  roomIds?: string[];
}

export interface Task {
  id: string;
  taskTemplate: TaskTemplate;
  // in whole organiztion OR

  // in these specific levels
  levels?: Level[];
  // in these types of rooms
  roomTypes?: RoomType[];

  // AND in these specific rooms
  rooms?: Room[];

  completed?: boolean;
}

export interface ScheduledChore {
  id: string;
  name: string;
  tasks: FBTask[];
  personId: string;
  schedule: Schedule;

  // in whole organiztion OR

  // in these specific levels
  levelIds?: string[];
  // in these types of rooms
  roomTypeIds?: string[];

  // AND in these specific rooms
  roomIds?: string[];
}

export interface FBScheduledChore {
  id: string;
  name: string;
  tasks: FBTask[];
  personId: string;
  schedule: FBSchedule;

  // in whole organiztion OR

  // in these specific levels
  levelIds?: string[];
  // in these types of rooms
  roomTypeIds?: string[];

  // AND in these specific rooms
  roomIds?: string[];
}

export interface FeedChore {
  id: string;
  name: string;
  tasks: Task[];
  person: Person;
  schedule: Schedule;

  // in whole organiztion OR

  // in these specific levels
  levels?: Level[];
  // in these types of rooms
  roomTypes?: RoomType[];

  // AND in these specific rooms
  rooms?: Room[];
}

export interface ScheduledChoreData {
  id: string; // orgId
  lastId: string;
  data: Map<FBScheduledChore>;
}

export interface ScheduledChoreState extends BaseSlice {
  orgsMap: {
    [key: string]: ScheduledChoreData;
  };
}

export interface UIChoreFeedItem {
  id: string;
  name: string;
  tasks: {
    name: string;
    id: string;
    completed: boolean;
  }[];
  person: {
    id: string;
    name: string;
  };
}
