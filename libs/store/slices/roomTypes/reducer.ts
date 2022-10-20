import { createSlice } from '@reduxjs/toolkit';
import { RoomTypesState } from './types';

const initialState: RoomTypesState = {
  data: [],
};

export const roomTypes = createSlice({
  name: 'roomTypes',
  initialState,
  reducers: {
    setRoomTypes: (state, action) => {
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
