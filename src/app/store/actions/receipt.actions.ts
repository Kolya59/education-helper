import { Action } from '@ngrx/store';

export enum EReceiptActions {
  GetRevenue = '[Receipt] Get Revenue',
  GetRevenueSuccess = '[Receipt] Get Revenue Success',
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

export type ReceiptActions = GetRevenue | GetRevenueSuccess;
