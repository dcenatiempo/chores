// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection as FBCollection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  updateDoc,
  onSnapshot,
  QueryConstraint,
  deleteDoc,
  addDoc,
  collection,
  enableIndexedDbPersistence,
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
import { Collection, OrgCollection } from './types';
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

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

async function fetchDocs<T>(
  collectionName: Collection | OrgCollection,
  ...queryConstraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(FBCollection(db, collectionName), ...queryConstraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

async function fetchDoc<T>(
  collectionName: Collection | OrgCollection,
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
  collectionName: Collection | OrgCollection;
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

export function listenForDocsChanges<A>({
  collectionName,
  queries,
  callback,
}: {
  collectionName: Collection | OrgCollection;
  queries: QueryConstraint[];
  callback: (entities: A[]) => void;
}) {
  const q = query(collection(db, collectionName), ...queries);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const docs: A[] = [];
    querySnapshot.forEach((doc) => {
      const newDoc = {
        id: doc?.id,
        ...doc?.data?.(),
      } as A;
      docs.push(newDoc);
    });

    callback(docs);
  });

  return unsubscribe;
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
  [x: string]: any;
}

export async function addEntityToOrgCollection<T, FBT extends Entity>({
  orgId,
  collection,
  entity,
  transformEntity,
  entityType,
}: {
  orgId: string;
  collection: OrgCollection;
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

export async function addEntityToCollection<T extends { [x: string]: any }>({
  collection,
  entity,
}: {
  orgId: string;
  collection: Collection;
  entity: T;
}) {
  const collectionRef = FBCollection(db, collection);
  await addDoc(collectionRef, entity);
}

export async function updateEntityFromCollection<
  T extends { [x: string]: any },
  FBT extends Entity
>({
  collection,
  entity,
  transformEntity,
}: {
  collection: Collection;
  entity: T;
  transformEntity: { toFB: (entity: T) => FBT };
}) {
  const firebaseEntity = transformEntity.toFB(entity);
  const orgDocRef = doc(db, collection, firebaseEntity.id);
  await updateDoc(orgDocRef, firebaseEntity);
}

export async function deleteEntityFromCollection<
  T extends { [x: string]: any }
>({ collection, entity }: { collection: Collection; entity: T }) {
  const orgDocRef = doc(db, collection, entity.id);
  await deleteDoc(orgDocRef);
}

export async function updateEntitiesFromOrg<T, FBT extends Entity>({
  entities,
  collection,
  orgId,
  transformEntity,
  entityType,
}: {
  entities: Map<T>;
  collection: OrgCollection;
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
  collection: OrgCollection.ORGS,
  entityType: OrgEntityType.ROOM,
};

export async function addRoomToOrg(params: AddEntityParams<Room>) {
  return addEntityToOrgCollection({
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
  collection: OrgCollection.ORGS,
};

export async function addTaskTemplateToOrg(
  params: AddEntityParams<TaskTemplate>
) {
  return addEntityToOrgCollection({
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
  collection: OrgCollection.ORGS,
};

export async function addChoreTemplateToOrg(
  params: AddEntityParams<ChoreTemplate>
) {
  return addEntityToOrgCollection({
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
  collection: OrgCollection.ORGS,
};

export async function addLevelToOrg(params: AddEntityParams<Level>) {
  return addEntityToOrgCollection({
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
  collection: OrgCollection.ORGS,
};

export async function addPersonToOrg(params: AddEntityParams<Person>) {
  return addEntityToOrgCollection({
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
