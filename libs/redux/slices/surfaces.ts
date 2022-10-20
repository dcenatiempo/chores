import { createSlice } from '@reduxjs/toolkit';

export const surfaces = createSlice({
  name: 'surfaces',
  initialState: {
    surfaces: [],
  },
  reducers: {
    setSurfaces: (state, action) => {
      state.surfaces = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { setSurfaces } = surfaces.actions;
export { setSurfaces };

export default surfaces.reducer;
