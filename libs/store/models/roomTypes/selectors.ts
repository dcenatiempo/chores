import { defaultMemoize, createSelector } from 'reselect';
import { RootState } from '../../store';
import { arrayToMap } from '../sharedTransformers';
import { transformRoomType } from './transformers';

const roomTypesArray = defaultMemoize((state: RootState) =>
  state.roomTypes.data.map((rt) => transformRoomType.fromFB(rt))
);

const roomTypes = createSelector(roomTypesArray, (a) => arrayToMap(a));

export { roomTypes, roomTypesArray };
