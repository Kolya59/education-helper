import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { UserService } from '../../services/user/user.service';
import { EUserActions, GetUser, GetUserSuccess } from '../actions/user.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUser } from '../../models/user.model';

@Injectable()
export class UserEffects {
  @Effect()
  getUser$ = this._actions.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    switchMap(() => this._userService.getUser()),
    switchMap((userHttp: IUser) => of(new GetUserSuccess(userHttp)))
  );

  constructor(
    private _userService: UserService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
