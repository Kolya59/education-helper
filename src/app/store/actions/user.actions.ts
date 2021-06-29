import { Action } from '@ngrx/store';
import { IUser } from '../../models/user.model';

export enum EUserActions {
  GetUser = '[User] GetUser',
  GetUserSuccess = '[User] GetUser Success',

  ClearUser = '[User] ClearUser',
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export class ClearUser implements Action {
  public readonly type = EUserActions.ClearUser;
}

export type UserActions = GetUser | GetUserSuccess | ClearUser;
