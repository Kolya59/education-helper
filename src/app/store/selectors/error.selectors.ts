import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.state';
import { IErrorState } from '../state/error.state';

const errorState = (state: IAppState) => state.error;

export const selectErrors = createSelector(
  errorState,
  (state: IErrorState) => state.errors
);
