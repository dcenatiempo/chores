import { configureStore } from '@reduxjs/toolkit';
import roomTypes from './models/roomTypes';
import surfaces from './models/surfaces';
import actions from './models/actions';
import user from './models/user';
import choreHistory from './models/choreHistory';
import choreFeed from './models/choreFeed';
import orgs from './models/orgs';
import appState from './appState';

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
    appState: appState.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
