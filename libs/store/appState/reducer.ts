import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

const initialState: AppState = {
  device: {
    isDark: true,
    screenHeight: 0,
    screenWidth: 0,
  },
  application: {
    isKidMode: false,
    kidModePin: undefined,
  },
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.device.isDark = action.payload;
    },
    setScreenHeight: (state, action: PayloadAction<number>) => {
      state.device.screenHeight = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.device.screenWidth = action.payload;
    },
    setScreenDimensions: (
      state,
      action: PayloadAction<{ height: number; width: number }>
    ) => {
      state.device.screenWidth = action.payload.width;
      state.device.screenHeight = action.payload.height;
    },
    toggleKidMode: (state, action: PayloadAction<string | undefined>) => {
      const newKidMode = !state.application.isKidMode;
      state.application.isKidMode = newKidMode;
      state.application.kidModePin = newKidMode ? action.payload : undefined;
    },
  },
});

const { actions, name, getInitialState, reducer } = AppSlice;
export { actions, name, getInitialState, reducer };
