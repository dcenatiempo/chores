import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { useSelector } from 'react-redux';
import { userStore } from '../store';

interface AuthUser extends User {}

enum AuthErrorMessages {
  INVALID_CREDENTIALS = 'The email or password is wrong, please try again',
  NETWORK_PROBLEMS = 'Please check your internet connection',
  EMAIL_EXISTS_ALREADY = 'That email is already in use, try another',
  UNKNOWN = 'Something went wrong, please try again',
}

interface LoginCredentials {
  email: string;
  password: string;
}

async function login({ email, password }: LoginCredentials) {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      if (error.message.includes('auth/network-request-failed'))
        throw new Error(AuthErrorMessages.NETWORK_PROBLEMS);
      if (
        error.message.includes('auth/user-not-found') ||
        error.message.includes('auth/wrong-password')
      )
        throw new Error(AuthErrorMessages.INVALID_CREDENTIALS);
      throw new Error(AuthErrorMessages.UNKNOWN);
    });
}

function logout() {
  getAuth().signOut();
}

function register({ email, password }: LoginCredentials) {
  return createUserWithEmailAndPassword(getAuth(), email, password)
    .then((res) => res.user)
    .catch((error) => {
      if (error.message.includes('auth/network-request-failed'))
        throw new Error(AuthErrorMessages.NETWORK_PROBLEMS);
      if (
        error.message.includes('auth/email-already-exists') ||
        error.message.includes('auth/email-already-in-use')
      )
        throw new Error(AuthErrorMessages.EMAIL_EXISTS_ALREADY);
      throw new Error(AuthErrorMessages.UNKNOWN);
    });
}

function useIsAuthenticated() {
  const isAuthenticated = useSelector(userStore.selectors.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
  const loading = false;

  return { loading, isAuthenticated };
}

export { login, logout, register, useIsAuthenticated };
export type { AuthUser };
