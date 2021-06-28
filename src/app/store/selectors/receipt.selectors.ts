import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IProgramState } from '../state/programs.state';
import { IReceiptState } from '../state/receipt.state';

const selectRevenue = (state: IAppState) => state.receipt;

export const selectCurrentRevenue = createSelector(
  selectRevenue,
  (state: IReceiptState) => state.revenue
);
