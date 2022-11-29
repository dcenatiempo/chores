import { documentId, where } from 'firebase/firestore';
import { OrgCollection, fetchDoc, fetchDocs } from '../../../firebase';
import { ScheduledChoreData } from './types';

export async function fetchOrgScheduledChores(
  orgId: string
): Promise<ScheduledChoreData | null> {
  return fetchDoc<ScheduledChoreData>(
    OrgCollection.ORG_SCHEDULED_CHORES,
    orgId
  );
}

export async function fetchOrgsScheduledChores(
  orgIds: string[] = []
): Promise<ScheduledChoreData[]> {
  if (!orgIds.length) return [];
  return fetchDocs(
    OrgCollection.ORG_SCHEDULED_CHORES,
    where(documentId(), 'in', orgIds)
  );
}
