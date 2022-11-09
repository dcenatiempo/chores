import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import * as firebase from './firebase';
import { actions as reducerActions } from './reducer';
import { transformAction } from './transformers';

export default function useActions() {
  const dispatch = useDispatch();

  const actions = useSelector(selectors.actions);
  const actionsArray = useSelector(selectors.actionsArray);

  async function fetchActions() {
    return firebase.fetchActions().then((actions) => {
      dispatch(reducerActions.setActions(actions));
    });
  }

  return {
    actions,
    actionsArray,
    fetchActions,
  };
}
