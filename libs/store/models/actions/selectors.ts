import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { transformAction } from './transformers';
import { arrayToMap } from '../sharedTransformers';

const actionsArray = defaultMemoize((state: RootState) =>
  state.actions.data.map(transformAction.fromFB)
);

const actions = createSelector(actionsArray, (a) => arrayToMap(a, 'name'));

export { actions, actionsArray };
