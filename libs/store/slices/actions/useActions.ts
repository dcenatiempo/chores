import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions as reducerActions } from './reducer';
import { transformActionsFromFirebase } from './transformers';

export default function useActions() {
  const dispatch = useDispatch();

  const surfaces = useSelector(selectors.actions);

  async function fetchActions() {
    return firebase.fetchActions().then((actions) => {
      const cleanActions = transformActionsFromFirebase(actions);
      dispatch(reducerActions.setActions(cleanActions));
      return cleanActions;
    });
  }

  return {
    surfaces,
    fetchActions,
  };
}
