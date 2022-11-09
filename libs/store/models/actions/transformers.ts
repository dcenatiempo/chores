import { FirebaseAction, Action } from './types';

export const transformAction = {
  fromFirebase(action: FirebaseAction): Action {
    return action;
  },
  toFirebase(action: Action): FirebaseAction {
    return action;
  },
};
