import * as reducers from './reducer';
import * as types from './types';
import * as selectors from './selectors';
export { default as useRoomTypes } from './useRoomTypes';

export default Object.freeze({
  ...reducers,
  types,
  selectors,
});
