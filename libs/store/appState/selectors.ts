import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../store';

const appState = defaultMemoize((state: RootState) => state.appState);

export { appState };
