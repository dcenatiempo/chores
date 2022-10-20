import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

const auth = getAuth();

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
  return signInWithEmailAndPassword(auth, email, password)
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
  auth.signOut();
}

function register({ email, password }: LoginCredentials) {
  return createUserWithEmailAndPassword(auth, email, password)
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const newIsAuthed = !!user;
      if (newIsAuthed === isAuthenticated) return;
      setLoading(false);
      setIsAuthenticated(newIsAuthed);
    });
    return unsubscribe;
  }, [isAuthenticated]);

  return { loading, isAuthenticated };
}

export { login, logout, register, useIsAuthenticated };
export type { AuthUser };
