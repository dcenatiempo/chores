import { TimeBoundary } from '../choreFeed/types';
import { OrgMap } from '../orgs/types';

export interface CompletedChore {
  id: string;
  orgPeopleIds: string[];
  completedAt: number;
  deadline: TimeBoundary;
  orgChoreId: string;
}

export interface ChoreFeedState extends BaseSlice {
  orgsMap: OrgMap<CompletedChore[]>;
}
