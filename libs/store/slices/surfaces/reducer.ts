import { createSlice } from '@reduxjs/toolkit';
import { SurfacesState } from './types';

const initialState: SurfacesState = {
  data: [],
};

const surfaces = createSlice({
  name: 'surfaces',
  initialState,
  reducers: {
    setSurfaces: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, name, getInitialState, reducer } = surfaces;
export { actions, name, getInitialState, reducer };
