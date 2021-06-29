import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import {
  selectProgramList,
  selectSelectedProgram,
} from '../../store/selectors/program.selectors';
import {
  AddProgram,
  DeleteProgram,
  GetPrograms,
  SelectProgram,
  UpdateProgram,
} from '../../store/actions/program.actions';
import {
  selectCurrentRevenue,
  selectReceiptList,
  selectSelectedReceipt,
} from '../../store/selectors/receipt.selectors';
import {
  AddReceipt,
  DeleteReceipt,
  GetReceipts,
  GetRevenue,
  SelectReceipt,
  UpdateReceipt,
} from '../../store/actions/receipt.actions';
import { MatTableDataSource } from '@angular/material/table';
import { IReceipt } from '../../models/receipt.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectErrors } from '../../store/selectors/error.selectors';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit, AfterViewInit {
  public noData: IReceipt[] = [<IReceipt>{}];
  public columnsToDisplay: string[] = [
    'Номер квитанции',
    'Идентификатор программы',
    'Сумма',
    'Дата',
    'Код ребенка',
    'Код компании',
  ];
  public dataSource: MatTableDataSource<IReceipt> = new MatTableDataSource(
    this.noData
  );
  receiptForm = new FormGroup({
    id: new FormControl('', Validators.required),
    sum: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    studentCode: new FormControl('', Validators.required),
    companyCode: new FormControl('', Validators.required),
  });

  revenueForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    program: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loadPrograms();
    this.store
      .pipe(select(selectReceiptList))
      .subscribe((receipts) => this.initializeData(receipts));
    this.loadReceipts();
  }

  ngAfterViewInit(): void {
    this.loadPrograms();
    this.loadReceipts();
  }

  selectReceipt(receipt: IReceipt | null) {
    console.log(receipt);
    if (receipt) {
      this.receiptForm.patchValue({
        id: receipt['Идентификатор программы'],
        sum: receipt['Сумма'],
        date: receipt['Дата'],
        studentCode: receipt['Код ребенка'],
        companyCode: receipt['Код компании'],
      });
    } else {
      this.receiptForm.reset();
    }
    this.store.dispatch(new SelectReceipt(receipt));
  }

  isSelectedReceipt(receipt: IReceipt): Observable<boolean> {
    return this.store
      .select(selectSelectedReceipt)
      .pipe(
        map((next) =>
          next ? next['Номер квитанции'] == receipt['Номер квитанции'] : false
        )
      );
  }

  hasSelectedReceipt(): Observable<boolean> {
    return this.store.select(selectSelectedReceipt).pipe(map((next) => !!next));
  }

  getErrorsSub(): Observable<string[]> {
    return this.store.select(selectErrors);
  }

  isAddUnavailable(): Observable<boolean> {
    return this.hasSelectedReceipt().pipe(
      map((next) => next || !this.receiptForm.valid)
    );
  }

  isDeleteUnavailable(): Observable<boolean> {
    return this.hasSelectedReceipt().pipe(map((next) => !next));
  }

  isEditUnavailable(): Observable<boolean> {
    return this.hasSelectedReceipt().pipe(
      map((next) => !next || !this.receiptForm.valid)
    );
  }

  addReceipt() {
    console.log('add', this.receiptForm.value);
    this.store.dispatch(
      new AddReceipt({
        'Номер квитанции': '0',
        'Идентификатор программы': this.receiptForm.value.id,
        Сумма: this.receiptForm.value.sum,
        Дата: this.receiptForm.value.date,
        'Код ребенка': this.receiptForm.value.studentCode,
        'Код компании': this.receiptForm.value.companyCode,
      })
    );
    this.loadReceipts();
  }

  editReceipt() {
    console.log('edit', this.receiptForm.value);
    this.store
      .select(selectSelectedReceipt)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(
            new UpdateReceipt({
              'Номер квитанции': next['Номер квитанции'],
              'Идентификатор программы': this.receiptForm.value.id,
              Сумма: this.receiptForm.value.sum,
              Дата: this.receiptForm.value.date,
              'Код ребенка': this.receiptForm.value.studentCode,
              'Код компании': this.receiptForm.value.companyCode,
            })
          );
          this.loadReceipts();
        }
      });
  }

  deleteReceipt() {
    console.log('delete', this.receiptForm.value);
    this.store
      .select(selectSelectedReceipt)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(new DeleteReceipt(next));
          this.loadReceipts();
        }
      });
  }

  private loadReceipts(): void {
    this.receiptForm.reset();
    this.selectReceipt(null);
    this.store.dispatch(new GetReceipts());
  }

  private initializeData(receipts: IReceipt[]): void {
    this.dataSource = new MatTableDataSource(
      receipts.length ? receipts : this.noData
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.selectReceipt(null);
    }
  }

  loadPrograms() {
    this.store.dispatch(new GetPrograms());
  }

  getPrograms() {
    return this.store.pipe(select(selectProgramList));
  }

  getRevenue() {
    this.store.dispatch(
      new GetRevenue({
        id: this.revenueForm.value.program,
        from: this.revenueForm.value.from,
        to: this.revenueForm.value.to,
      })
    );
  }

  isLoadUnavailable() {
    return !this.revenueForm.valid;
  }

  getRevenueValue() {
    return this.store.pipe(select(selectCurrentRevenue));
  }
}
