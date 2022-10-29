// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  updateDoc,
  arrayUnion,
  onSnapshot,
  QueryConstraint,
  where,
  documentId,
} from 'firebase/firestore';
import { userStore } from '../store';
import { FirebaseUser, User } from '../store/slices/user/types';
import { Collection, FirebaseOrg } from './types';
export * from './types';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDc4zB6BOS67tJHG05bFfI1I1UcppfktHs',
  authDomain: 'chores-e975a.firebaseapp.com',
  projectId: 'chores-e975a',
  storageBucket: 'chores-e975a.appspot.com',
  messagingSenderId: '562800463987',
  appId: '1:562800463987:web:1457904dc892e981c89a06',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function fetchDocs<T>(
  collectionName: Collection,
  ...queryConstraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...queryConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

const unsubscribeMap: { [key: string]: () => void } = {};

export async function fetchDoc<T>(
  collectionName: Collection,
  ...pathSegments: string[]
): Promise<T | null> {
  const docRef = doc(db, collectionName, ...pathSegments);
  const docSnapshot = await getDoc(docRef);
  const docData = docSnapshot.data?.() || null;
  return docData as T;
}

export function listenForDocChanges<A, B>({
  collectionName,
  docId,
  transformer,
  callback,
}: {
  collectionName: Collection;
  docId: string;
  transformer(doc: A): B;
  callback: (entity: B) => void;
}) {
  const listenerKey = `${collectionName}-${docId}`;
  unsubscribeMap?.[listenerKey]?.();
  unsubscribeMap[listenerKey] = onSnapshot(
    doc(db, collectionName, docId),
    (doc) => {
      const newDoc: B = transformer({
        id: docId,
        ...doc?.data?.(),
      } as A);
      callback(newDoc);
    }
  );
}

/////////////////////////////////////////////////////////////////////////////////////

export async function createUser(userId: string, user: FirebaseUser) {
  const res = await setDoc(doc(db, 'users', userId), user);
  console.log('createUser', res);
}

// export async function getUserOrgs(user: User): Promise<FirebaseOrg[]> {
//   const orgs: DocumentSnapshot[] = await Promise.all(
//     user.organizationIds?.map((id) => {
//       const ref = doc(db, 'organization', id);
//       return getDoc(ref);
//     })
//   );
//   return orgs.map((org) => {
//     const x = org.data();
//     return { id: org.id, ...org.data() };
//   }) as FirebaseOrg[];
// }

export async function addPersonToOrg({
  firstName,
  lastName,
  birthday,
  orgId,
}: {
  firstName: string;
  lastName?: string;
  birthday?: number;
  orgId: string;
}) {
  const orgDocRef = doc(db, 'organization', orgId);
  const newPerson = { firstName, lastName, birthday };
  if (!birthday) delete newPerson.birthday;
  if (!lastName) delete newPerson.lastName;

  const res = await updateDoc(orgDocRef, {
    people: arrayUnion(newPerson),
  });
}
