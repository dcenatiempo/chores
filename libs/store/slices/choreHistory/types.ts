import { TimeBoundary } from '../choreFeed/types';
import { OrgMap } from '../orgs/types';
import { BaseSlice } from '../types';

export interface CompletedChore {
  id: string;
  orgPeopleIds: string[];
  completedAt: number;
  deadline: TimeBoundary;
  orgChoreId: string;
}

export interface ChoreHistoryState extends BaseSlice {
  orgsMap: OrgMap<CompletedChore[]>;
}
