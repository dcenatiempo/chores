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
  ChoreTemplate,
  Level,
  Person,
  Room,
  TaskTemplate,
} from '../store/models/orgs/types';
import { transformMap } from '../store/models/sharedTransformers';
import { Map } from '../store/models/types';
import { transformUser } from '../store/models/user/transformers';
import { FBUser, User } from '../store/models/user/types';
import { Collection } from './types';
export * from './types';

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
    const x = doc?.data?.();
    const newDoc: A = {
      id: docId,
      ...doc?.data?.(),
    } as A;
    callback(newDoc);
  });
}

export { app, auth, db, fetchDocs, fetchDoc, listenForDocChanges };

export enum OrgEntityType {
  ROOM = 'rooms',
  TASK = 'tasks',
  CHORE = 'chores',
  PERSON = 'people',
  LEVEL = 'levels',
  SCHEDULED_CHORES = 'data',
}
interface Entity {
  id: string;
}
export async function addEntityToCollection<T, FBT extends Entity>({
  orgId,
  collection,
  entity,
  transformEntity,
  entityType,
}: {
  orgId: string;
  collection: Collection;
  entity: T;
  transformEntity: { toFB: (entity: T) => FBT };
  entityType: OrgEntityType;
}) {
  const orgDocRef = doc(db, collection, orgId);
  const fbEntity = transformEntity.toFB(entity);
  await updateDoc(orgDocRef, {
    [`${entityType}.${fbEntity.id}`]: fbEntity,
    lastId: fbEntity.id,
  });
}

export async function updateEntitiesFromOrg<T, FBT extends Entity>({
  entities,
  collection,
  orgId,
  transformEntity,
  entityType,
}: {
  entities: Map<T>;
  collection: Collection;
  orgId: string;
  transformEntity: { toFB: (entity: T) => FBT };
  entityType: OrgEntityType;
}) {
  const firebaseEntities: Map<FBT> = transformMap(
    entities,
    transformEntity.toFB
  );
  const docRef = doc(db, collection, orgId);

  await updateDoc(docRef, {
    [entityType]: firebaseEntities,
  });
}

/////////////////////////////////////////////////////////////////////////////////////

export async function createUser(userId: string, user: User) {
  const fbUser: FBUser = transformUser.toFB(user);
  await setDoc(doc(db, 'users', userId), fbUser);
}

interface AddEntityParams<T> {
  entity: T;
  orgId: string;
}

interface UpdateEntitiesParams<T> {
  entities: Map<T>;
  orgId: string;
}

const roomConfig = {
  transformEntity: transformRoom,
  collection: Collection.ORGS,
  entityType: OrgEntityType.ROOM,
};

export async function addRoomToOrg(params: AddEntityParams<Room>) {
  return addEntityToCollection({
    ...params,
    ...roomConfig,
  });
}

export async function updateRoomsFromOrg(params: UpdateEntitiesParams<Room>) {
  return updateEntitiesFromOrg({
    ...params,
    ...roomConfig,
  });
}

const taskConfig = {
  transformEntity: transformTask,
  entityType: OrgEntityType.TASK,
  collection: Collection.ORGS,
};

export async function addTaskTemplateToOrg(
  params: AddEntityParams<TaskTemplate>
) {
  return addEntityToCollection({
    ...params,
    ...taskConfig,
  });
}

export async function updateTaskTemplatesFromOrg(
  params: UpdateEntitiesParams<TaskTemplate>
) {
  return updateEntitiesFromOrg({
    ...params,
    ...taskConfig,
  });
}

const choreConfig = {
  transformEntity: transformChore,
  entityType: OrgEntityType.CHORE,
  collection: Collection.ORGS,
};

export async function addChoreTemplateToOrg(
  params: AddEntityParams<ChoreTemplate>
) {
  return addEntityToCollection({
    ...params,
    ...choreConfig,
  });
}

export async function updateChoreTemplatesFromOrg(
  params: UpdateEntitiesParams<ChoreTemplate>
) {
  return updateEntitiesFromOrg({
    ...params,
    ...choreConfig,
  });
}

const levelConfig = {
  transformEntity: transformLevel,
  entityType: OrgEntityType.LEVEL,
  collection: Collection.ORGS,
};

export async function addLevelToOrg(params: AddEntityParams<Level>) {
  return addEntityToCollection({
    ...params,
    ...levelConfig,
  });
}

export async function updateLevelsFromOrg(params: UpdateEntitiesParams<Level>) {
  return updateEntitiesFromOrg({
    ...params,
    ...levelConfig,
  });
}

const personConfig = {
  transformEntity: transformPerson,
  entityType: OrgEntityType.PERSON,
  collection: Collection.ORGS,
};

export async function addPersonToOrg(params: AddEntityParams<Person>) {
  return addEntityToCollection({
    ...params,
    ...personConfig,
  });
}

export async function updatePeopleFromOrg(
  params: UpdateEntitiesParams<Person>
) {
  return updateEntitiesFromOrg({
    ...params,
    ...personConfig,
  });
}
