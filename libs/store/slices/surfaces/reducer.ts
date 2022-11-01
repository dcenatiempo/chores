import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SurfaceTemplate, SurfacesState } from './types';

const initialState: SurfacesState = {
  data: [],
  loading: false,
  error: null,
};

const surfacesSlice = createSlice({
  name: 'surfaces',
  initialState,
  reducers: {
    setSurfaces: (state, action: PayloadAction<SurfaceTemplate[]>) => {
      state.data = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = surfacesSlice;
export { actions, name, getInitialState, reducer };
