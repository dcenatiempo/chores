import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';

export const initialState: UserState = {
  data: {
    id: '',
    birthday: 0,
    firstName: '',
    lastName: '',
    email: '',
    organizationIds: [],
  },
  loading: false,
  error: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
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
