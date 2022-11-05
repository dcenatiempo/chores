import * as reducers from './reducer';
import * as types from './types';
import * as selectors from './selectors';

const store = Object.freeze({
  ...reducers,
  types,
  selectors,
});

export default store;
