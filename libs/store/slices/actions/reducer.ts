import { createSlice } from '@reduxjs/toolkit';
import { ActionsState } from './types';

const initialState: ActionsState = {
  data: [],
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setActions: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = actionsSlice;
export { actions, name, getInitialState, reducer };
