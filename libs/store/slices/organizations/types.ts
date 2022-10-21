export interface Person {
  lastName: string;
  birthday: number;
  firstName: string;
}

export interface Room {
  descriptor: string;
  surface: string;
  level: string;
  name: string;
  type: string;
}

export interface Chore {
  name: string;
}

export interface Organization {
  id: string;
  name: string;
  levels: string[];
  rooms: Room[];
  people: Person[];
  chores: Chore[];
}
export interface OrganizationMap {
  [key: string]: Organization;
}

export interface OrganizationsState {
  data: OrganizationMap;
  currentOrganizationdId: string | undefined;
}
