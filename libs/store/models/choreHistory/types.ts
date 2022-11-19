import { BaseSlice, OrgMap } from '../types';

export interface CompletedChore {
  id: string;
  orgPeopleIds: string[];
  completedAt: number;
  // deadline: TimeBoundary;
  orgChoreId: string;
}

export interface ChoreHistoryState extends BaseSlice {
  orgsMap: OrgMap<CompletedChore[]>;
}
