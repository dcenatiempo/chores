import { Collection } from '../../../firebase';
import { cleanFromObject } from '../../../utils';
import { transformReference, transformTimestamp } from '../sharedTransformers';
import { initialState } from './reducer';
import { FirebaseUser, User } from './types';

export const transformUser = {
  fromFirebase(user: FirebaseUser | null): User {
    const blankUser = initialState.data;
    if (!user) return blankUser;
    return {
      id: user.authId,
      birthday: user.birthday
        ? transformTimestamp.fromFirebase(user.birthday)
        : blankUser.birthday,
      firstName: user.firstName || user.authId,
      lastName: user.lastName || blankUser.lastName,
      email: user.email || blankUser.email,
      organizationIds: user.organizations
        ? transformReference.fromFirebase(user.organizations)
        : blankUser.organizationIds,
    };
  },
  toFirebase(user: User): FirebaseUser {
    let firebaseUser = {
      authId: user.id,
      birthday: user.birthday
        ? transformTimestamp.toFirebase(user.birthday)
        : undefined,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizations: user.organizationIds?.map((id) =>
        transformReference.toFirebase(Collection.USER, id)
      ),
    };
    // @ts-expect-error
    firebaseUser = cleanFromObject(firebaseUser, [undefined, null, '']);
    return firebaseUser as FirebaseUser;
  },
};
