import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { userReducers } from './user.reducers';
import { studentReducers } from './student.reducers';
import { routerReducer } from '@ngrx/router-store';
import { errorReducers } from './error.reducers';
import { programReducers } from './program.reducers';
import { receiptReducers } from './receipt.reducers';
import { teacherReducers } from './teacher.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  user: userReducers,
  student: studentReducers,
  program: programReducers,
  receipt: receiptReducers,
  teacher: teacherReducers,
  error: errorReducers,
};
