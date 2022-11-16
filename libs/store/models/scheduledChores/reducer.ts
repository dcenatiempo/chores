import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduledChoreData, ScheduledChoreState } from './types';
import * as log from '../../../logging';
import { arrayToMap } from '../sharedTransformers';

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
    setLastId: (
      state,
      action: PayloadAction<{ lastId: string; currentOrgId: string }>
    ) => {
      const currentOrgId = action.payload.currentOrgId;
      if (!currentOrgId)
        return log.warn('could not incrementLastId, "currentOrgId" needed');
      const newLastId = action.payload.lastId;
      if (!newLastId) return;
      state.orgsMap[currentOrgId].lastId = newLastId;
    },
  },
});

const { actions, name, getInitialState, reducer } = scheduledChoreSlice;
export { actions, name, getInitialState, reducer };
