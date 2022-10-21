import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Surface } from '../surfaces/types';
import {
  Organization,
  OrganizationMap,
  OrganizationsState,
  Person,
  Room,
} from './types';

let unsubscribe: () => void;
const initialState: OrganizationsState = {
  data: {},
  currentOrganizationdId: undefined,
};

export const organizations = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      const mappedData = action?.payload?.reduce<OrganizationMap>(
        (acc, org) => Object.assign({}, acc, { [org.id]: org }),
        {}
      );
      state.data = mappedData;

      // maybe set currentOrganizationId
      const currentOrgId = state.currentOrganizationdId;
      if (!currentOrgId || !mappedData?.[currentOrgId]) {
        const newCurrentOrgId = action?.payload?.[0]?.id;
        state.currentOrganizationdId = newCurrentOrgId;
      }
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      const orgId = action?.payload?.id;
      if (orgId) state.data[orgId] = action.payload;
    },
    clearOrganizations: (state) => {
      state.data = initialState.data;
    },
    resetOrganizations: (state) => {
      state = Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listenForOrgChanges.fulfilled, (state, action) => {
      console.log('OrgChanged!!!');
      console.log(action.payload);
      state.data;
    });
  },
});

const listenForOrgChanges = createAsyncThunk(
  'xxx',
  async (_: undefined, thunkAPI) => {
    const orgId = thunkAPI.getState().organizations.currentOrganizationdId;
    unsubscribe?.();
    return new Promise((resolve, reject) => {
      unsubscribe = onSnapshot(doc(db, 'organization', orgId), (doc) => {
        const newOrg: Organization = cleanOrg({ id: orgId, ...doc?.data?.() });
        thunkAPI.dispatch(actions.updateOrganization(newOrg));
        resolve(newOrg);
      });
    });
  }
);

const { actions, name, getInitialState, reducer } = organizations;
const asyncActions = { listenForOrgChanges };
export {
  actions,
  asyncActions,
  name,
  getInitialState,
  reducer,
  cleanRooms,
  cleanOrgs,
};

function cleanOrgs(orgs) {
  return (
    orgs?.map((org) => {
      return cleanOrg(org);
    }) || []
  );
}

function cleanOrg(org) {
  return {
    ...org,
    people: cleanPeople(org.people),
    rooms: cleanRooms(org.rooms),
  };
}

function cleanPeople(people): Person[] {
  return people?.map((person) => {
    return { ...person, birthday: cleanBirthday(person.birthday) };
  });
}

function cleanBirthday(birthday) {
  return birthday?.seconds || '';
}

function cleanRooms(rooms): Room[] {
  const newRooms =
    rooms?.map((room) => {
      return {
        ...room,
        type: cleanRoomType(room.type),
        surfaces: cleanSurfaces(room.surfaces),
      };
    }) || [];
  return newRooms;
}

function cleanRoomType(type) {
  return type.id;
}

function cleanSurfaces(surfaces): Surface[] {
  return (
    surfaces?.map((surface) => ({ ...surface, surface: surface.surface.id })) ||
    []
  );
}
