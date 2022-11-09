import { documentId, where } from 'firebase/firestore';
import { Collection, fetchDoc, fetchDocs } from '../../../firebase';
import { FBOrg } from './types';

export async function fetchOrg(orgId: string): Promise<FBOrg | null> {
  return fetchDoc<FBOrg>(Collection.ORGS, orgId);
}

export async function fetchOrgs(orgIds: string[] = []): Promise<FBOrg[]> {
  if (!orgIds.length) return [];
  return fetchDocs(Collection.ORGS, where(documentId(), 'in', orgIds));
}
