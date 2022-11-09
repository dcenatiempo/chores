import { BaseSlice } from '../types';

export interface ActionsState extends BaseSlice {
  data: FBAction[];
}

export interface FBAction {
  name: string;
}

export interface Action {
  name: string;
}
