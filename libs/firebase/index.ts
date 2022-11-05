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
} from 'firebase/firestore';
import {
  transformPerson,
  transformRoom,
} from '../store/models/orgs/transformers';
import { FirebasePerson, Person, Room } from '../store/models/orgs/types';
import { transformUser } from '../store/models/user/transformers';
import { FirebaseUser, User } from '../store/models/user/types';
import { Collection } from './types';
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function fetchDocs<T>(
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

async function fetchDoc<T>(
  collectionName: Collection,
  ...pathSegments: string[]
): Promise<T | null> {
  const docRef = doc(db, collectionName, ...pathSegments);
  const docSnapshot = await getDoc(docRef);
  const docData = docSnapshot.data?.() || null;
  return docData as T;
}

const unsubscribeMap: { [key: string]: () => void } = {};
function getUnsubscribeMap() {
  return unsubscribeMap;
}

function listenForDocChanges<A, B>({
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
  const map = getUnsubscribeMap();
  map?.[listenerKey]?.();
  map[listenerKey] = onSnapshot(doc(db, collectionName, docId), (doc) => {
    const newDoc: B = transformer({
      id: docId,
      ...doc?.data?.(),
    } as A);
    callback(newDoc);
  });
}

export { app, auth, db, fetchDocs, fetchDoc, listenForDocChanges };

/////////////////////////////////////////////////////////////////////////////////////

export async function createUser(userId: string, user: User) {
  const firebaseUser: FirebaseUser = transformUser.toFirebase(user);
  const res = await setDoc(doc(db, 'users', userId), firebaseUser);
  console.log('createUser', res);
}

export async function addPersonToOrg({
  person,
  orgId,
}: {
  person: Person;
  orgId: string;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const newPerson = transformPerson.toFirebase(person);

  const res = await updateDoc(orgDocRef, {
    people: arrayUnion(newPerson),
  });
}

export async function updatePeopleFromOrg({
  people,
  orgId,
}: {
  people: Person[];
  orgId: string;
}) {
  const firebasePeople: FirebasePerson[] = people?.map((person) =>
    transformPerson.toFirebase(person)
  );

  const docRef = doc(db, Collection.ORGS, orgId);

  const res = await updateDoc(docRef, {
    people: firebasePeople,
  });
}

export async function addRoomtoOrg({
  orgId,
  room,
}: {
  orgId: string;
  room: Room;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const res = await updateDoc(orgDocRef, {
    rooms: arrayUnion(transformRoom.toFirebase(room)),
  });
}
