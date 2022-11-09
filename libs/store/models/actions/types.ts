import { BaseSlice } from '../types';

export interface Action {
  name: string;
}

export interface ActionsState extends BaseSlice {
  data: Action[];
}

export interface FirebaseAction {
  name: string;
}
