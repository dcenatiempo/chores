// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { userStore } from '../store';
import { userState } from '../store/slices/user/types';

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

interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
  organizations?: string[];
}
export async function createUser(userId: string, user: User) {
  const res = await setDoc(doc(db, 'users', userId), user);
  console.log('createUser', res);
}

export async function getUser(userId: string): Promise<userState> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data?.();
  if (!user) return userStore.getInitialState();

  const orgIds = user.organizations.map((o) => o.id);

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: userId,
    organizationIds: orgIds,
  };
}

export async function getUserOrgs(user: userState) {
  const orgs = await Promise.all(
    user.organizationIds?.map((id) => {
      const ref = doc(db, 'organization', id);
      return getDoc(ref);
    })
  );
  return orgs.map((org) => {
    const x = org.data();
    return { id: org.id, ...org.data() };
  });
}

export async function getSurfaces() {
  const q = query(collection(db, 'surfaces'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getRoomTypes() {
  const q = query(collection(db, 'roomTypes'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getActions() {
  const q = query(collection(db, 'actions'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

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
