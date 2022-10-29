import { OrgMap } from '../orgs/types';

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
  orgPeopleIds: string[];
  startTime: TimeBoundary;
  deadline: TimeBoundary;
  orgChoreId: string;
}

export interface ChoreFeedState extends BaseSlice {
  orgsMap: OrgMap<ScheduledChore[]>;
}
