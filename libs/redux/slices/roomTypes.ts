import { createSlice } from '@reduxjs/toolkit';

export const roomTypes = createSlice({
  name: 'roomTypes',
  initialState: {
    types: [],
  },
  reducers: {
    setRoomTypes: (state, action) => {
      state.types = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { setRoomTypes } = roomTypes.actions;
export { setRoomTypes };

export default roomTypes.reducer;
