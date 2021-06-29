import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IReceiptState } from '../state/receipt.state';

const selectReceipt = (state: IAppState) => state.receipt;

export const selectCurrentRevenue = createSelector(
  selectReceipt,
  (state: IReceiptState) => state.revenue
);

export const selectReceiptList = createSelector(
  selectReceipt,
  (state: IReceiptState) => state.receipts
);

export const selectSelectedReceipt = createSelector(
  selectReceipt,
  (state: IReceiptState) => state.selectedReceipt
);
