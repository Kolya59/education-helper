import { initialReceiptState, IReceiptState } from '../state/receipt.state';
import { EReceiptActions, ReceiptActions } from '../actions/receipt.actions';

export const receiptReducers = (
  state = initialReceiptState,
  action: ReceiptActions
): IReceiptState => {
  switch (action.type) {
    case EReceiptActions.GetRevenueSuccess:
      return {
        ...state,
        revenue: action.payload,
      };
    default:
      return state;
  }
};
