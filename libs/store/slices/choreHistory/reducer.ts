import { createSlice } from '@reduxjs/toolkit';
import { ChoreHistoryState } from './types';

const initialState: ChoreHistoryState = {
  data: [],
  loading: false,
  error: null,
};

export const choreHistorySlice = createSlice({
  name: 'choreHistory',
  initialState,
  reducers: {
    setChoreHistory: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = choreHistorySlice;
export { actions, name, getInitialState, reducer };
