import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface userState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationIds: string[];
  currentOrganizationdId: string;
}
export const initialState: userState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  organizationIds: [],
  currentOrganizationdId: '',
};
export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = user.actions;

export default user.reducer;
