import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listenForDocChanges } from '../../../firebase';
import { Collection } from '../../../firebase/types';
import * as log from '../../../logging';
import { arrayToOrgMap } from './transformers';
import { FBOrg, OrgsState } from './types';

export const initialLastId = '1000';

const initialState: OrgsState = {
  orgsMap: {},
  currentOrgId: undefined,
  loading: false,
  error: null,
};

export const orgs = createSlice({
  name: 'orgs',
  initialState,
  reducers: {
    setOrgs: (state, action: PayloadAction<FBOrg[]>) => {
      const mappedData = arrayToOrgMap(action?.payload);
      state.orgsMap = mappedData;

      // maybe set currentOrgId
      const currentOrgId = state.currentOrgId;
      if (!currentOrgId || !mappedData?.[currentOrgId]) {
        const newCurrentOrgId = Object.keys(mappedData)?.[0];
        state.currentOrgId = newCurrentOrgId;
      }
    },
    updateOrg: (state, action: PayloadAction<FBOrg>) => {
      const orgId = action?.payload?.id;
      if (orgId) state.orgsMap[orgId] = { orgId, data: action.payload };
    },
    setLastId: (state, action: PayloadAction<string>) => {
      const currentOrgId = state.currentOrgId;
      if (!currentOrgId)
        return log.warn('could not incrementLastId, "currentOrgId" needed');
      const newLastId = action.payload;
      if (!newLastId) return;
      state.orgsMap[currentOrgId].data.lastId = newLastId;
    },
    clearOrgs: (state) => {
      state.orgsMap = initialState.orgsMap;
    },
    resetOrgsState: (state) => {
      state = Object.assign(state, initialState);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(listenForOrgChanges.fulfilled, () => {
  //     console.log('extraReducer');
  //   });
  // },
});

const listenForOrgChanges = createAsyncThunk(
  'someTypePrefix?',
  async (_: undefined, thunkAPI) => {
    // @ts-expect-error
    const orgId: string = thunkAPI.getState().orgs.currentOrgId;
    listenForDocChanges({
      collectionName: Collection.ORGS,
      docId: orgId,
      callback: (org: FBOrg) => thunkAPI.dispatch(actions.updateOrg(org)),
    });
  }
);

const { actions, name, getInitialState, reducer } = orgs;
const asyncActions = { listenForOrgChanges };
export { actions, asyncActions, name, getInitialState, reducer };
