import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionsState, FBAction } from './types';

const initialState: ActionsState = {
  data: [],
  loading: false,
  error: null,
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setActions: (state, action: PayloadAction<FBAction[]>) => {
      state.data = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = actionsSlice;
export { actions, name, getInitialState, reducer };
