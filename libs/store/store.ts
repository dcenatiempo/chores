import { configureStore } from '@reduxjs/toolkit';
import organizations from './slices/organizations';
import roomTypes from './slices/roomTypes';
import surfaces from './slices/surfaces';
import actions from './slices/actions';
import user from './slices/user';

//Global store
const store = configureStore({
  reducer: {
    user: user.reducer,
    organizations: organizations.reducer,
    roomTypes: roomTypes.reducer,
    surfaces: surfaces.reducer,
    actions: actions.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
