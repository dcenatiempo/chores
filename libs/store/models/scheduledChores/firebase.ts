import { documentId, where } from 'firebase/firestore';
import { Collection, fetchDoc, fetchDocs } from '../../../firebase';
import { ScheduledChoreData } from './types';

export async function fetchOrgScheduledChores(
  orgId: string
): Promise<ScheduledChoreData | null> {
  return fetchDoc<ScheduledChoreData>(Collection.ORG_SCHEDULED_CHORES, orgId);
}

export async function fetchOrgsScheduledChores(
  orgIds: string[] = []
): Promise<ScheduledChoreData[]> {
  if (!orgIds.length) return [];
  return fetchDocs(
    Collection.ORG_SCHEDULED_CHORES,
    where(documentId(), 'in', orgIds)
  );
}
