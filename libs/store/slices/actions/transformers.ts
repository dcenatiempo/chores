import { FirebaseAction, Action } from './types';

export function transformActionsFromFirebase(
  actions: FirebaseAction[] = []
): Action[] {
  return actions.map((rt) => ({
    id: rt.id,
    name: rt.name,
  }));
}
