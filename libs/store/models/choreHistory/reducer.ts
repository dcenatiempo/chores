import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChoreHistoryData, ChoreHistoryState, FBHistoryChore } from './types';
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
    setOrgChoreHistory: (state, action: PayloadAction<FBHistoryChore[]>) => {
      const mappedData: { [key: string]: ChoreHistoryData } = {};
      action.payload.forEach((c) => {
        if (!mappedData[c.orgId]) {
          mappedData[c.orgId] = { id: c.orgId, data: {} };
        }
        mappedData[c.orgId].data[c.id] = c;
      });
      state.orgsMap = mappedData;
    },
    updateHistoryChore: (state, action: PayloadAction<FBHistoryChore>) => {
      const orgId = action?.payload.id;
      const chore = action?.payload;
      if (orgId) state.orgsMap[orgId].data[chore.id] = chore;
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
      callback: (chores: FBHistoryChore[]) => {
        thunkAPI.dispatch(actions.setOrgChoreHistory(chores));
      },
    });
  }
);

const { actions, name, getInitialState, reducer } = ChoreHistorySlice;
const asyncActions = { listenForChoreHistoryChanges };
export { asyncActions, actions, name, getInitialState, reducer };
