import { Action } from '@ngrx/store';
import { IUserState } from '../state/user.state';
import { IUser } from '../../models/user.model';

export enum EUserActions {
  GetUser = '[User] GetUser',
  GetUserSuccess = '[User] GetUser Success',
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export type UserActions = GetUser | GetUserSuccess;
