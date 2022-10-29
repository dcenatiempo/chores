import { createSlice } from '@reduxjs/toolkit';
import { ChoreFeedState } from './types';

const initialState: ChoreFeedState = {
  orgs: {},
  loading: false,
  error: null,
};

export const choreFeedSlice = createSlice({
  name: 'choreFeed',
  initialState,
  reducers: {
    setChoreFeed: (state, action) => {
      state.orgs = action.payload;
    },
  },
});

const { actions, name, getInitialState, reducer } = choreFeedSlice;
export { actions, name, getInitialState, reducer };
