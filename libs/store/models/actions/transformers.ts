import { FBAction, Action } from './types';

export const transformAction = {
  fromFB(action: FBAction): Action {
    return action;
  },
  toFB(action: Action): FBAction {
    return action;
  },
};
