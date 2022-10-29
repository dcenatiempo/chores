import { FirebaseReference, FirebaseTimestamp } from '../../../firebase';

export interface User {
  id: string;
  birthday: EpochTimeStamp;
  firstName: string;
  lastName: string;
  email: string;
  organizationIds: string[];
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
