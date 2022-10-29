import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const choreHistory = defaultMemoize(
  (state: RootState) => state.choreHistory.data
);

export { choreHistory };
