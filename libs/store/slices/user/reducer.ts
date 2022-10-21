import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userState } from './types';

const initialState: userState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  organizationIds: [],
};
export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      state = Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, name, getInitialState, reducer } = user;
export { actions, name, getInitialState, reducer };
