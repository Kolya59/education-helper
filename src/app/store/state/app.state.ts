import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { initialStudentState, IStudentState } from './students.state';
import { IErrorState, initialErrorState } from './error.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
  student: IStudentState;
  error: IErrorState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  student: initialStudentState,
  error: initialErrorState,
};
