import { IReceipt } from '../../models/receipt.model';

export interface IReceiptState {
  revenue: string | null;
  receipts: IReceipt[];
  selectedReceipt: IReceipt | null;
}

export const initialReceiptState: IReceiptState = {
  revenue: null,
  receipts: [],
  selectedReceipt: {
    'Номер квитанции': '',
    'Идентификатор программы': '',
    Сумма: '',
    Дата: '',
    'Код ребенка': '',
    'Код компании': '',
  },
};
