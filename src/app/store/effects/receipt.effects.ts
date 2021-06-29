import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddError } from '../actions/error.actions';
import { ReceiptService } from '../../services/receipt/receipt.service';
import {
  AddReceipt,
  AddReceiptSuccess,
  DeleteReceipt,
  DeleteReceiptSuccess,
  EReceiptActions,
  GetReceipts,
  GetReceiptsSuccess,
  GetRevenue,
  GetRevenueSuccess,
  SelectReceipt,
  SelectReceiptSuccess,
  UpdateReceipt,
  UpdateReceiptSuccess,
} from '../actions/receipt.actions';
import { selectReceiptList } from '../selectors/receipt.selectors';
import { IReceipt } from '../../models/receipt.model';

@Injectable()
export class ReceiptEffects {
  @Effect()
  getRevenue$ = this._actions.pipe(
    ofType<GetRevenue>(EReceiptActions.GetRevenue),
    map((action) => action.payload),
    switchMap((payload) =>
      this._receiptService.getRevenue(payload.id, payload.from, payload.to)
    ),
    switchMap((revenue: string) => of(new GetRevenueSuccess(revenue))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  selectReceipt$ = this._actions.pipe(
    ofType<SelectReceipt>(EReceiptActions.SelectReceipt),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectReceiptList))),
    switchMap(([selected, receipts]) => {
      if (!selected) {
        return of(new SelectReceiptSuccess(null));
      }
      const selectedReceipt = receipts.filter(
        (receipt: IReceipt) =>
          receipt['Номер квитанции'] === `${selected['Номер квитанции']}`
      )[0];
      return of(new SelectReceiptSuccess(selectedReceipt));
    })
  );

  @Effect()
  getReceipts$ = this._actions.pipe(
    ofType<GetReceipts>(EReceiptActions.GetReceipts),
    switchMap(() => this._receiptService.getReceipts()),
    switchMap((receiptsHttp: IReceipt[]) =>
      of(new GetReceiptsSuccess(receiptsHttp))
    ),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  addReceipt$ = this._actions.pipe(
    ofType<AddReceipt>(EReceiptActions.AddReceipt),
    map((action) => action.payload),
    switchMap((receipt) => this._receiptService.addReceipt(receipt)),
    switchMap((receipt) => of(new AddReceiptSuccess(receipt))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  updateReceipt$ = this._actions.pipe(
    ofType<UpdateReceipt>(EReceiptActions.UpdateReceipt),
    map((action) => action.payload),
    switchMap((receipt) => this._receiptService.updateReceipt(receipt)),
    switchMap((receipt) => of(new UpdateReceiptSuccess(receipt))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  deleteReceipt$ = this._actions.pipe(
    ofType<DeleteReceipt>(EReceiptActions.DeleteReceipt),
    map((action) => action.payload),
    switchMap(async (receipt: IReceipt) => {
      let res: IReceipt;
      try {
        res = await this._receiptService.deleteReceipt(receipt);
      } catch (error) {
        return of(new AddError(error));
      }
      return of(new DeleteReceiptSuccess(res));
    })
  );

  constructor(
    private _receiptService: ReceiptService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
