import { FBTimestamp } from '../../../firebase';
import { BaseSlice, Map } from '../types';

export interface HistoryChore {
  id: string;
  orgId: string;
  personId: string;
  scheduledChoreId: string;
  startDate: FBTimestamp;
  dueDate: FBTimestamp;
  taskIdsCompleted: string[];
  // taskIdsApproved: string[];
}

export interface CreateHistoryChoreInput {
  orgId: string;
  personId: string;
  scheduledChoreId: string;
  startDate: FBTimestamp;
  dueDate: FBTimestamp;
  taskIdsCompleted: string[];
  // taskIdsApproved: string[];
}

export interface FBHistoryChore {
  id: string;
  orgId: string;
  personId: string;
  scheduledChoreId: string;
  startDate: FBTimestamp;
  dueDate: FBTimestamp;
  taskIdsCompleted: string[];
  // taskIdsApproved: string[];
}

export interface ChoreHistoryData {
  id: string; // orgId
  data: Map<FBHistoryChore>;
}

export interface ChoreHistoryState extends BaseSlice {
  orgsMap: {
    [key: string]: ChoreHistoryData;
  };
}
