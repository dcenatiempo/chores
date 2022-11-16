import { Chore, Person } from '../orgs/types';
import { BaseSlice } from '../types';

export interface ScheduleRepeat {
  frequency: number; // 1-365
  duration: 'day' | 'week' | 'month' | 'year';
  weekly?: string; // MTWHFSU
  monthly?: 'day' | 'date' | 'end'; // 'day' = the 4th thursday of every month, 'date' = the 27th of every month, 'end' = end of the month (28, 29, 30, 31)
}

export enum TimeModifier {
  OPEN = 'OPEN', // if start it means now, if end it means when completed - can't be late
  SOFT = 'SOFT', // if start it means midnight of that day, if end it means 23:59:59 of that day
  HARD = 'HARD', // start or end it means that exact time
}

export interface OpenTimeBoundary {
  timestamp?: number;
  modifier: TimeModifier.OPEN;
}

export interface ClosedTimeBoundary {
  timestamp: number;
  modifier: TimeModifier.SOFT | TimeModifier.HARD;
}

export type TimeBoundary = OpenTimeBoundary | ClosedTimeBoundary;

export interface ScheduledChore {
  id: string;
  startTime: TimeBoundary;
  deadline: TimeBoundary;
  orgChoreId: string;
  personId: string;
  repeat: ScheduleRepeat;
}

export interface FBScheduledChore {
  id: string;
  startTime: TimeBoundary;
  deadline: TimeBoundary;
  orgChoreId: string;
  personId: string;
  repeat: ScheduleRepeat;
}

export interface FeedChore {
  id: string;
  startTime: TimeBoundary;
  deadline: TimeBoundary;
  orgChore: Chore;
  person: Person;
}

export interface ScheduledChoreData {
  orgId: string;
  lastId: string;
  data: FBScheduledChore[];
}

export interface ScheduledChoreState extends BaseSlice {
  orgsMap: {
    [key: string]: ScheduledChoreData;
  };
}
