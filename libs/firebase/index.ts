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
  FBChore,
  FBLevel,
  FBPerson,
  FBRoom,
  FBTask,
  Level,
  Person,
  Room,
  Task,
} from '../store/models/orgs/types';
import { transformMap } from '../store/models/sharedTransformers';
import { Map } from '../store/models/types';
import { transformUser } from '../store/models/user/transformers';
import { FBUser, User } from '../store/models/user/types';
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

function listenForDocChanges<A>({
  collectionName,
  docId,
  callback,
}: {
  collectionName: Collection;
  docId: string;
  callback: (entity: A) => void;
}) {
  const listenerKey = `${collectionName}-${docId}`;
  const map = getUnsubscribeMap();
  map?.[listenerKey]?.();
  map[listenerKey] = onSnapshot(doc(db, collectionName, docId), (doc) => {
    const newDoc: A = {
      id: docId,
      ...doc?.data?.(),
    } as A;
    callback(newDoc);
  });
}

export { app, auth, db, fetchDocs, fetchDoc, listenForDocChanges };

/////////////////////////////////////////////////////////////////////////////////////

export async function createUser(userId: string, user: User) {
  const fbUser: FBUser = transformUser.toFB(user);
  await setDoc(doc(db, 'users', userId), fbUser);
}

export async function updatePeopleFromOrg({
  people,
  orgId,
}: {
  people: Map<Person>;
  orgId: string;
}) {
  const firebasePeople: Map<FBPerson> = transformMap(
    people,
    transformPerson.toFB
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
  rooms: Map<Room>;
  orgId: string;
}) {
  const fbRooms: Map<FBRoom> = transformMap(rooms, transformRoom.toFB);

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    rooms: fbRooms,
  });
}

export async function updateTasksFromOrg({
  tasks,
  orgId,
}: {
  tasks: Map<Task>;
  orgId: string;
}) {
  const fbTasks: Map<FBTask> = transformMap(tasks, transformTask.toFB);

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    tasks: fbTasks,
  });
}

export async function updateChoresFromOrg({
  chores,
  orgId,
}: {
  chores: Map<Chore>;
  orgId: string;
}) {
  const fbChores: Map<FBChore> = transformMap(chores, transformChore.toFB);

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    chores: fbChores,
  });
}

export async function updateLevelsFromOrg({
  levels,
  orgId,
}: {
  levels: Map<Level>;
  orgId: string;
}) {
  debugger;
  const fbLevels: Map<FBLevel> = transformMap(levels, transformLevel.toFB);

  const docRef = doc(db, Collection.ORGS, orgId);

  await updateDoc(docRef, {
    levels: fbLevels,
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
  const fbRoom = transformRoom.toFB(room);
  await updateDoc(orgDocRef, {
    [`rooms.${fbRoom.id}`]: fbRoom,
    lastId: fbRoom.id,
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
  const fbTask = transformTask.toFB(task);
  await updateDoc(orgDocRef, {
    [`task.${fbTask.id}`]: fbTask,
    lastId: fbTask.id,
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
  const fbChore = transformChore.toFB(chore);
  await updateDoc(orgDocRef, {
    [`chore.${fbChore.id}`]: fbChore,
    lastId: fbChore.id,
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
  const fbLevel = transformLevel.toFB(level);

  await updateDoc(orgDocRef, {
    [`levels.${fbLevel.id}`]: fbLevel,
    lastId: fbLevel.id,
  });
}

export async function addPersonToOrg({
  person,
  orgId,
}: {
  person: Person;
  orgId: string;
}) {
  const orgDocRef = doc(db, Collection.ORGS, orgId);
  const fbPerson = transformPerson.toFB(person);

  await updateDoc(orgDocRef, {
    [`people.${fbPerson.id}`]: fbPerson,
    lastId: fbPerson.id,
  });
}
