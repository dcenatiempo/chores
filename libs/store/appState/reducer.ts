import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const initialState: AppState = {
  isDark: true,
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = AppSlice;
export { actions, name, getInitialState, reducer };
