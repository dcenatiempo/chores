import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const surfaces = defaultMemoize((state: RootState) => state.surfaces.data);

export { surfaces };
