import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FBRoomType, RoomTypesState } from './types';

const initialState: RoomTypesState = {
  data: [],
  loading: false,
  error: null,
};

export const roomTypes = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {
    setRoomTypes: (state, action: PayloadAction<FBRoomType[]>) => {
      state.data = action.payload;
    },
    clearRoomTypes: (state) => {
      state.data = [];
    },
    resetRoomTypes: (state) => {
      state = Object.assign(state, initialState);
    },
  },
});

const { actions, name, getInitialState, reducer } = roomTypes;
export { actions, name, getInitialState, reducer };
