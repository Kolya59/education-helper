import { Action } from '@ngrx/store';
import { IReceipt } from '../../models/receipt.model';

export enum EReceiptActions {
  GetRevenue = '[Receipt] Get Revenue',
  GetRevenueSuccess = '[Receipt] Get Revenue Success',

  SelectReceipt = '[Receipt] Select Receipt',
  SelectReceiptSuccess = '[Receipt] Select Receipt Success',

  GetReceipts = '[Receipt] Get Receipts',
  GetReceiptsSuccess = '[Receipt] Get Receipts Success',

  AddReceipt = '[Receipt] Add Receipt',
  AddReceiptSuccess = '[Receipt] Add Receipt Success',

  UpdateReceipt = '[Receipt] Update Receipt',
  UpdateReceiptSuccess = '[Receipt] Update Receipt Success',

  DeleteReceipt = '[Receipt] Delete Receipt',
  DeleteReceiptSuccess = '[Receipt] Delete Receipt Success',
}

export class GetRevenue implements Action {
  public readonly type = EReceiptActions.GetRevenue;
  constructor(
    public payload: {
      id: string;
      from: string;
      to: string;
    }
  ) {}
}

export class GetRevenueSuccess implements Action {
  public readonly type = EReceiptActions.GetRevenueSuccess;
  constructor(public payload: string) {}
}

export class SelectReceipt implements Action {
  public readonly type = EReceiptActions.SelectReceipt;
  constructor(public payload: IReceipt | null) {}
}

export class SelectReceiptSuccess implements Action {
  public readonly type = EReceiptActions.SelectReceiptSuccess;
  constructor(public payload: IReceipt | null) {}
}

export class GetReceipts implements Action {
  public readonly type = EReceiptActions.GetReceipts;
}

export class GetReceiptsSuccess implements Action {
  public readonly type = EReceiptActions.GetReceiptsSuccess;
  constructor(public payload: IReceipt[]) {}
}

export class AddReceipt implements Action {
  public readonly type = EReceiptActions.AddReceipt;
  constructor(public payload: IReceipt) {}
}

export class AddReceiptSuccess implements Action {
  public readonly type = EReceiptActions.AddReceiptSuccess;
  constructor(public payload: IReceipt) {}
}

export class UpdateReceipt implements Action {
  public readonly type = EReceiptActions.UpdateReceipt;
  constructor(public payload: IReceipt) {}
}

export class UpdateReceiptSuccess implements Action {
  public readonly type = EReceiptActions.UpdateReceiptSuccess;
  constructor(public payload: IReceipt) {}
}

export class DeleteReceipt implements Action {
  public readonly type = EReceiptActions.DeleteReceipt;
  constructor(public payload: IReceipt) {}
}

export class DeleteReceiptSuccess implements Action {
  public readonly type = EReceiptActions.DeleteReceiptSuccess;
  constructor(public payload: IReceipt) {}
}

export type ReceiptActions =
  | GetRevenue
  | GetRevenueSuccess
  | SelectReceipt
  | SelectReceiptSuccess
  | GetReceipts
  | GetReceiptsSuccess
  | AddReceipt
  | AddReceiptSuccess
  | UpdateReceipt
  | UpdateReceiptSuccess
  | DeleteReceipt
  | DeleteReceiptSuccess;
