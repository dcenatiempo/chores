import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const initialState: AppState = {
  isDark: true,
  isKidMode: false,
  kidModePin: undefined,
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    toggleKidMode: (state, action: PayloadAction<string | undefined>) => {
      const newKidMode = !state.isKidMode;
      state.isKidMode = newKidMode;
      state.kidModePin = newKidMode ? action.payload : undefined;
    },
  },
});

const { actions, name, getInitialState, reducer } = AppSlice;
export { actions, name, getInitialState, reducer };
