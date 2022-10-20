import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from './slices/organizations';
import roomTypesReducer from './slices/roomTypes';
import surfacesReducer from './slices/surfaces';
import actionsReducer from './slices/actions';
import userReducer from './slices/user';

//Global store
export const store = configureStore({
  reducer: {
    //reducers are defined here
    user: userReducer,
    organizations: organizationsReducer,
    roomTypes: roomTypesReducer,
    surfaces: surfacesReducer,
    actions: actionsReducer,
  },
});
