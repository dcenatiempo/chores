import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions as reducerActions } from './reducer';
import { transformAction } from './transformers';

export default function useActions() {
  const dispatch = useDispatch();

  const actions = useSelector(selectors.actions);

  async function fetchActions() {
    return firebase.fetchActions().then((actions) => {
      const cleanActions = actions.map(transformAction.fromFirebase);
      dispatch(reducerActions.setActions(cleanActions));
      return cleanActions;
    });
  }

  return {
    actions,
    fetchActions,
  };
}
