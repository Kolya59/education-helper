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
    case EReceiptActions.SelectReceiptSuccess:
      return {
        ...state,
        selectedReceipt: action.payload,
      };
    case EReceiptActions.GetReceiptsSuccess:
      return {
        ...state,
        receipts: action.payload,
      };
    case EReceiptActions.AddReceiptSuccess:
      return <IReceiptState>{
        ...state,
        receipts: [
          ...state.receipts,
          {
            ...action.payload,
            'Номер квитанции': state.receipts.length,
          },
        ],
      };
    case EReceiptActions.UpdateReceiptSuccess:
      return {
        ...state,
        receipts: state.receipts.map((v) => {
          if (v['Номер квитанции'] == action.payload['Номер квитанции']) {
            return action.payload;
          }
          return v;
        }),
      };
    case EReceiptActions.DeleteReceiptSuccess:
      return {
        ...state,
        receipts: state.receipts.filter((v) => {
          return v['Номер квитанции'] != action.payload['Номер квитанции'];
        }),
      };
    default:
      return state;
  }
};
