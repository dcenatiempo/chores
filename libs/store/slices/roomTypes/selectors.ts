import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';

const roomTypes = defaultMemoize((state: RootState) => state.roomTypes.data);

export { roomTypes };
