import { documentId, where } from 'firebase/firestore';
import {
  Collection,
  fetchDoc,
  fetchDocs,
  OrgCollection,
} from '../../../firebase';
import { FBOrg } from './types';

export async function fetchOrg(orgId: string): Promise<FBOrg | null> {
  return fetchDoc<FBOrg>(OrgCollection.ORGS, orgId);
}

export async function fetchOrgs(orgIds: string[] = []): Promise<FBOrg[]> {
  if (!orgIds.length) return [];
  return fetchDocs(OrgCollection.ORGS, where(documentId(), 'in', orgIds));
}
