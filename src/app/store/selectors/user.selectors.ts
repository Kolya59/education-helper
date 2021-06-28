import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.state';

const userState = (state: IAppState) => state.user;

export const selectCurrentUser = createSelector(
  userState,
  (state: IUserState) => state.currentUser
);
