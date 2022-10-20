import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const organizations = createSlice({
  name: 'organizations',
  initialState: {
    name: '',
    levels: [],
    rooms: [],
    people: [],
  },
  reducers: {
    setOrganizations: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrganizations } = organizations.actions;

export default organizations.reducer;

export function cleanOrgs(orgs) {
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

function cleanPeople(people) {
  return people?.map((person) => {
    return { ...person, birthday: cleanBirthday(person.birthday) };
  });
}

function cleanBirthday(birthday) {
  return birthday?.seconds || '';
}

export function cleanRooms(rooms) {
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

function cleanSurfaces(surfaces) {
  return (
    surfaces?.map((surface) => ({ ...surface, surface: surface.surface.id })) ||
    []
  );
}
