import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChoreHistoryData, ChoreHistoryState } from './types';
import { arrayToMap } from '../sharedTransformers';
import { Collection, listenForDocChanges } from '../../../firebase';

const initialState: ChoreHistoryState = {
  orgsMap: {},
  loading: false,
  error: null,
};

export const ChoreHistorySlice = createSlice({
  name: 'ChoreHistory',
  initialState,
  reducers: {
    setOrgChoreHistory: (state, action: PayloadAction<ChoreHistoryData[]>) => {
      const mappedData = arrayToMap(action.payload);
      state.orgsMap = mappedData;
    },
    updateChoreHistory: (state, action: PayloadAction<ChoreHistoryData>) => {
      const orgId = action?.payload.id;
      if (orgId) state.orgsMap[orgId] = action.payload;
    },
    clearChoreHistory: (state) => {
      state.orgsMap = initialState.orgsMap;
    },
  },
});

// TODO: figure this out
const listenForChoreHistoryChanges = createAsyncThunk(
  'someTypePrefix?',
  async (_: undefined, thunkAPI) => {
    // @ts-expect-error
    const orgId: string = thunkAPI.getState().orgs.currentOrgId;
    listenForDocChanges({
      collectionName: Collection.CHORE_HISTORY,
      docId: orgId,
      callback: (choreData: ChoreHistoryData) => {
        thunkAPI.dispatch(actions.updateChoreHistory(choreData));
      },
    });
  }
);

const { actions, name, getInitialState, reducer } = ChoreHistorySlice;
const asyncActions = { listenForChoreHistoryChanges };
export { asyncActions, actions, name, getInitialState, reducer };
