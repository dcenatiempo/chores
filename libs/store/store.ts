import { configureStore } from '@reduxjs/toolkit';
import roomTypes from './slices/roomTypes';
import surfaces from './slices/surfaces';
import actions from './slices/actions';
import user from './slices/user';
import choreHistory from './slices/choreHistory';
import choreFeed from './slices/choreFeed';
import orgs from './slices/orgs';

// Global store
const store = configureStore({
  reducer: {
    user: user.reducer,
    orgs: orgs.reducer,
    choreHistory: choreHistory.reducer,
    choreFeed: choreFeed.reducer,
    roomTypes: roomTypes.reducer,
    surfaces: surfaces.reducer,
    actions: actions.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
