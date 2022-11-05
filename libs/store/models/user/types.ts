import { FirebaseReference, FirebaseTimestamp } from '../../../firebase';
import { BaseSlice } from '../types';

export interface User {
  id: string;
  birthday: EpochTimeStamp | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  organizationIds: string[] | undefined;
}

export interface UserState extends BaseSlice {
  data: User;
}

export interface FirebaseUserInput {
  authId: string;
  birthday?: FirebaseTimestamp; // TODO
  email?: string;
  firstName?: string;
  lastName?: string;
  organizations?: string[]; // TODO
}

export interface FirebaseUser {
  authId: string;
  birthday?: FirebaseTimestamp;
  email?: string;
  firstName?: string;
  lastName?: string;
  organizations?: FirebaseReference[]; // array of references
}
