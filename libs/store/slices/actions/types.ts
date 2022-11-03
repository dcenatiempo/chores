import { BaseSlice } from '../types';

export interface Action {
  // id is camelCaseName
  id: string;
  name: string;
}

export interface ActionsState extends BaseSlice {
  data: Action[];
}

export interface FirebaseAction {
  // id is camelCaseName
  id: string;
  name: string;
}
