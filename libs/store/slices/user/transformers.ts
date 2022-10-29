import {
  referenceTransformer,
  timestampTransformer,
} from '../sharedTransformers';
import { initialState } from './reducer';
import { FirebaseUser, User } from './types';

export function transformUserFromFirebase(user: FirebaseUser | null): User {
  const blankUser = initialState.data;
  if (!user) return blankUser;
  return {
    id: user.authId,
    birthday: user.birthday
      ? timestampTransformer(user.birthday)
      : blankUser.birthday,
    firstName: user.firstName || user.authId,
    lastName: user.lastName || blankUser.lastName,
    email: user.email || blankUser.email,
    organizationIds: user.organizations
      ? referenceTransformer(user.organizations)
      : blankUser.organizationIds,
  };
}
