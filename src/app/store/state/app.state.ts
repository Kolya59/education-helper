import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { initialStudentState, IStudentState } from './students.state';
import { IErrorState, initialErrorState } from './error.state';
import { initialProgramState, IProgramState } from './program.state';
import { initialReceiptState, IReceiptState } from './receipt.state';
import { initialTeacherState, ITeacherState } from './teacher.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
  student: IStudentState;
  program: IProgramState;
  receipt: IReceiptState;
  teacher: ITeacherState;
  error: IErrorState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  student: initialStudentState,
  program: initialProgramState,
  receipt: initialReceiptState,
  teacher: initialTeacherState,
  error: initialErrorState,
};
