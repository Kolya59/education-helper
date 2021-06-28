import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { initialStudentState, IStudentState } from './students.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
  student: IStudentState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  student: initialStudentState,
};
