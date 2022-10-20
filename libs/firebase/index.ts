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
} from 'firebase/firestore';
import {
  initialState as initialUserState,
  userState,
} from '../redux/slices/user';

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
  if (!user) return initialUserState;

  const orgIds = user.organizations.map((o) => o.id);

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: userId,
    organizationIds: orgIds,
    currentOrganizationdId: orgIds?.[0] || '',
  };
}

export async function getUserOrgs(user: userState) {
  const orgs = await Promise.all(
    user.organizationIds?.map((id) => {
      const ref = doc(db, 'organization', id);
      return getDoc(ref);
    })
  );
  return orgs.map((org) => org.data());
}

export async function getSurfaces() {
  const q = query(collection(db, 'surfaces'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function getRoomTypes() {
  const q = query(collection(db, 'roomTypes'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function getActions() {
  const q = query(collection(db, 'actions'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}
