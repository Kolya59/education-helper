import { Action } from '@ngrx/store';
import { IUserState } from '../state/user.state';
import { IUser } from '../../models/user.model';

export enum EErrorActions {
  AddError = '[Errors] AddError',
}

export class AddError implements Action {
  public readonly type = EErrorActions.AddError;
  constructor(public payload: string) {
    console.log(this.type);
  }
}

export type ErrorActions = AddError;
