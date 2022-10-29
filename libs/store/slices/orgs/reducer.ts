import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listenForDocChanges } from '../../../firebase';
import { Collection } from '../../../firebase/types';
import { transformOrgFromFirebase } from './transformers';
import { Org, OrgMap, OrgsState } from './types';

let unsubscribe: () => void;
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
    setOrgs: (state, action: PayloadAction<Org[]>) => {
      const mappedData = arrayToOrgMap(action?.payload);
      state.orgsMap = mappedData;

      // maybe set currentOrgId
      const currentOrgId = state.currentOrgId;
      if (!currentOrgId || !mappedData?.[currentOrgId]) {
        const newCurrentOrgId = Object.keys(mappedData)?.[0];
        state.currentOrgId = newCurrentOrgId;
      }
    },
    updateOrg: (state, action: PayloadAction<Org>) => {
      const orgId = action?.payload?.id;
      if (orgId) state.orgsMap[orgId] = { orgId, data: action.payload };
    },
    clearorgs: (state) => {
      state.orgsMap = initialState.orgsMap;
    },
    resetOrgsState: (state) => {
      state = Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listenForOrgChanges.fulfilled, () => {});
  },
});

const listenForOrgChanges = createAsyncThunk(
  'someTypePrefix?',
  async (_: undefined, thunkAPI) => {
    // @ts-expect-error
    const orgId: string = thunkAPI.getState().orgs.currentOrgId;

    listenForDocChanges({
      collectionName: Collection.ORGS,
      docId: orgId,
      transformer: transformOrgFromFirebase,
      callback: (org: Org) => thunkAPI.dispatch(actions.updateOrg(org)),
    });
  }
);

// TODO: what if T is not an org?
function arrayToOrgMap<T>(array: T[], field: string = 'id'): OrgMap<T> {
  return array.reduce<OrgMap<T>>((map, thing) => {
    // @ts-expect-error
    const key = thing[field];
    map[key] = {
      orgId: key,
      data: thing,
    };
    return map;
  }, {});
}

const { actions, name, getInitialState, reducer } = orgs;
const asyncActions = { listenForOrgChanges };
export { actions, asyncActions, name, getInitialState, reducer };
