import { documentId, where } from 'firebase/firestore';
import {
  Collection,
  fetchDoc,
  fetchDocs,
  FirebaseOrg,
} from '../../../firebase';

export async function fetchOrg(orgId: string): Promise<FirebaseOrg | null> {
  return fetchDoc<FirebaseOrg>(Collection.ORGS, orgId);
}

export async function fetchOrgs(orgIds: string[] = []): Promise<FirebaseOrg[]> {
  if (!orgIds.length) return [];
  return fetchDocs(Collection.ORGS, where(documentId(), 'in', orgIds));
}
