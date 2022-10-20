import { createSlice } from '@reduxjs/toolkit';

export const actions = createSlice({
  name: 'actions',
  initialState: {
    actions: [],
  },
  reducers: {
    setActions: (state, action) => {
      state.actions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { setActions } = actions.actions;
export { setActions };

export default actions.reducer;
