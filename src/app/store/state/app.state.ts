import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { initialStudentState, IStudentState } from './students.state';
import { IErrorState, initialErrorState } from './error.state';
import { initialProgramState, IProgramState } from './programs.state';
import { initialReceiptState, IReceiptState } from './receipt.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
  student: IStudentState;
  program: IProgramState;
  receipt: IReceiptState;
  error: IErrorState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  student: initialStudentState,
  program: initialProgramState,
  receipt: initialReceiptState,
  error: initialErrorState,
};
