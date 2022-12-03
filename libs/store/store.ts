import { combineReducers, configureStore } from '@reduxjs/toolkit';
import roomTypes from './models/roomTypes';
import surfaces from './models/surfaces';
import actions from './models/actions';
import user from './models/user';
import choreHistory from './models/choreHistory';
import scheduledChores from './models/scheduledChores';
import orgs from './models/orgs';
import appState from './appState';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['appState'],
};

const reducers = combineReducers({
  user: user.reducer,
  orgs: orgs.reducer,
  choreHistory: choreHistory.reducer,
  scheduledChores: scheduledChores.reducer,
  roomTypes: roomTypes.reducer,
  surfaces: surfaces.reducer,
  actions: actions.reducer,
  appState: appState.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Global store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
