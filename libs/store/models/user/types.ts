import { FBReference, FBTimestamp } from '../../../firebase';
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
  data: FBUser;
}

export interface FBUserInput {
  authId: string;
  birthday?: FBTimestamp; // TODO
  email?: string;
  firstName?: string;
  lastName?: string;
  organizations?: string[]; // TODO
}

export interface FBUser {
  authId: string;
  birthday?: FBTimestamp;
  email?: string;
  firstName?: string;
  lastName?: string;
  organizations?: FBReference[]; // array of references
}
