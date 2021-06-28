import { Action } from '@ngrx/store';
import { IUserState } from '../state/user.state';
import { IUser } from '../../models/user.model';

export enum EErrorActions {
  AddError = '[Errors] AddError',
  AddErrorSuccess = '[Errors] AddError Success',
}

export class AddError implements Action {
  public readonly type = EErrorActions.AddError;
  constructor(public payload: string) {}
}

export class AddErrorSuccess implements Action {
  public readonly type = EErrorActions.AddErrorSuccess;
  constructor(public payload: string) {}
}

export type ErrorActions = AddError | AddErrorSuccess;
