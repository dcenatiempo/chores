import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const actions = defaultMemoize((state: RootState) => state.actions.data);

export { actions };
