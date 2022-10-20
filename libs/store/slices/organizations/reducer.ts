import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Surface } from '../surfaces/types';
import { Organization, Person, Room } from './types';

interface OrganizationsState {
  data: Organization[];
}

const initialState: OrganizationsState = {
  data: [],
};

export const organizations = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (state, action) => {
      state.data = action.payload;
    },
    clearOrganizations: (state) => {
      state.data = initialState.data;
    },
    resetOrganizations: (state) => {
      state = Object.assign(state, initialState);
    },
  },
});

const { actions, name, getInitialState, reducer } = organizations;
export { actions, name, getInitialState, reducer, cleanRooms, cleanOrgs };

function cleanOrgs(orgs) {
  return (
    orgs?.map((org) => {
      return {
        ...org,
        people: cleanPeople(org.people),
        rooms: cleanRooms(org.rooms),
      };
    }) || []
  );
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
