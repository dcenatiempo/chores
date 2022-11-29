import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduledChoreData, ScheduledChoreState } from './types';
import * as log from '../../../logging';
import { arrayToMap } from '../sharedTransformers';
import { listenForDocChanges, OrgCollection } from '../../../firebase';

export const initialLastId = '1000';

const initialState: ScheduledChoreState = {
  orgsMap: {},
  loading: false,
  error: null,
};

export const scheduledChoreSlice = createSlice({
  name: 'ScheduledChore',
  initialState,
  reducers: {
    setOrgsScheduledChores: (
      state,
      action: PayloadAction<ScheduledChoreData[]>
    ) => {
      const mappedData = arrayToMap(action.payload);
      state.orgsMap = mappedData;
    },
    updateScheduledChores: (
      state,
      action: PayloadAction<ScheduledChoreData>
    ) => {
      const orgId = action?.payload.id;
      if (orgId) state.orgsMap[orgId] = action.payload;
    },
    clearScheduledChores: (state) => {
      state.orgsMap = initialState.orgsMap;
    },
    setLastId: (
      state,
      action: PayloadAction<{ lastId: string; orgId: string }>
    ) => {
      const orgId = action.payload.orgId;
      if (!orgId) return log.warn('could not incrementLastId, "orgId" needed');
      const newLastId = action.payload.lastId;
      if (!newLastId) return;
      state.orgsMap[orgId].lastId = newLastId;
    },
  },
});

const listenForScheduledChoreChanges = createAsyncThunk(
  'someTypePrefix?',
  async (_: undefined, thunkAPI) => {
    // @ts-expect-error
    const orgId: string = thunkAPI.getState().orgs.currentOrgId;
    listenForDocChanges({
      collectionName: OrgCollection.ORG_SCHEDULED_CHORES,
      docId: orgId,
      callback: (choreData: ScheduledChoreData) => {
        thunkAPI.dispatch(actions.updateScheduledChores(choreData));
      },
    });
  }
);

const { actions, name, getInitialState, reducer } = scheduledChoreSlice;
const asyncActions = { listenForScheduledChoreChanges };
export { asyncActions, actions, name, getInitialState, reducer };
