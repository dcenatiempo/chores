import { Collection } from '../../../firebase';
import { cleanFromObject } from '../../../utils';
import { transformReference, transformTimestamp } from '../sharedTransformers';
import { initialState } from './reducer';
import { FBUser, User } from './types';

export const transformUser = {
  fromFB(user: FBUser | null): User {
    const blankUser: User = {
      id: '',
      birthday: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      organizationIds: undefined,
    };
    if (!user) return blankUser;
    return {
      id: user.authId,
      birthday: user.birthday
        ? transformTimestamp.fromFB(user.birthday)
        : blankUser.birthday,
      firstName: user.firstName || user.authId,
      lastName: user.lastName || blankUser.lastName,
      email: user.email || blankUser.email,
      organizationIds: user.organizations
        ? user.organizations.map((r) => transformReference.fromFB(r))
        : blankUser.organizationIds,
    };
  },
  toFB(user: User): FBUser {
    let firebaseUser = {
      authId: user.id,
      birthday: user.birthday
        ? transformTimestamp.toFB(user.birthday)
        : undefined,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizations: user.organizationIds?.map((id) =>
        transformReference.toFB(Collection.USER, id)
      ),
    };
    // @ts-expect-error
    firebaseUser = cleanFromObject(firebaseUser, [undefined, null, '']);
    return firebaseUser as FBUser;
  },
};
