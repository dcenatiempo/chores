import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FBUser, UserState } from './types';

export const initialState: UserState = {
  data: {
    authId: '',
    firstName: '',
    lastName: '',
    email: '',
    organizations: [],
  },
  loading: false,
  error: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FBUser>) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = initialState.data;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, name, getInitialState, reducer } = user;
export { actions, name, getInitialState, reducer };
