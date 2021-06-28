import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddError } from '../actions/error.actions';
import { ReceiptService } from '../../services/receipt/receipt.service';
import {
  EReceiptActions,
  GetRevenue,
  GetRevenueSuccess,
} from '../actions/receipt.actions';

@Injectable()
export class ReceiptEffects {
  @Effect()
  getPrograms$ = this._actions.pipe(
    ofType<GetRevenue>(EReceiptActions.GetRevenue),
    map((action) => action.payload),
    switchMap((payload) =>
      this._receiptService.getRevenue(payload.id, payload.from, payload.to)
    ),
    switchMap((revenue: string) => of(new GetRevenueSuccess(revenue))),
    catchError((error) => of(new AddError(error)))
  );

  constructor(
    private _receiptService: ReceiptService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
