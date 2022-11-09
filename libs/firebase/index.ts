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
  transformChore,
  transformLevel,
  transformPerson,
  transformRoom,
  transformTask,
} from '../store/models/orgs/transformers';
import {
  Chore,
  FirebaseChore,
  FirebaseLevel,
  FirebasePerson,
  FirebaseRoom,
  FirebaseTask,
  Level,
  Person,
  Room,
  Task,
} from '../store/models/orgs/types';
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
  await setDoc(doc(db, 'users', userId), firebaseUser);
}

export async function addPersonToOrg({
  person,
  orgId,
}: {
  person: Person;
  orgId: string;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const firebasePerson = transformPerson.toFirebase(person);

  await updateDoc(orgDocRef, {
    people: arrayUnion(firebasePerson),
    lastId: firebasePerson.id,
  });
}

export async function addLevelToOrg({
  level,
  orgId,
}: {
  level: Level;
  orgId: string;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const firebaseLevel = transformLevel.toFirebase(level);

  await updateDoc(orgDocRef, {
    levels: arrayUnion(firebaseLevel),
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

  await updateDoc(docRef, {
    people: firebasePeople,
  });
}

export async function updateRoomsFromOrg({
  rooms,
  orgId,
}: {
  rooms: Room[];
  orgId: string;
}) {
  const firebaseRooms: FirebaseRoom[] = rooms?.map((room) =>
    transformRoom.toFirebase(room)
  );

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    rooms: firebaseRooms,
  });
}

export async function updateTasksFromOrg({
  tasks,
  orgId,
}: {
  tasks: Task[];
  orgId: string;
}) {
  const firebaseTasks: FirebaseTask[] = tasks?.map((task) =>
    transformTask.toFirebase(task)
  );

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    tasks: firebaseTasks,
  });
}

export async function updateChoresFromOrg({
  chores,
  orgId,
}: {
  chores: Chore[];
  orgId: string;
}) {
  const firebaseChores: FirebaseChore[] = chores?.map((chore) =>
    transformChore.toFirebase(chore)
  );

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    chores: firebaseChores,
  });
}

export async function updateLevelsFromOrg({
  levels,
  orgId,
}: {
  levels: Level[];
  orgId: string;
}) {
  const firebaseLevels: FirebaseLevel[] = levels?.map((level) =>
    transformLevel.toFirebase(level)
  );

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    levels: firebaseLevels,
  });
}

export async function addRoomToOrg({
  orgId,
  room,
}: {
  orgId: string;
  room: Room;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const firebaseRoom = transformRoom.toFirebase(room);
  await updateDoc(orgDocRef, {
    rooms: arrayUnion(firebaseRoom),
    lastId: firebaseRoom.id,
  });
}

export async function addTaskToOrg({
  orgId,
  task,
}: {
  orgId: string;
  task: Task;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const firebaseTask = transformTask.toFirebase(task);
  await updateDoc(orgDocRef, {
    tasks: arrayUnion(firebaseTask),
    lastId: firebaseTask.id,
  });
}

export async function addChoreToOrg({
  orgId,
  chore,
}: {
  orgId: string;
  chore: Chore;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const firebaseChore = transformChore.toFirebase(chore);
  await updateDoc(orgDocRef, {
    chores: arrayUnion(firebaseChore),
    lastId: firebaseChore.id,
  });
}
