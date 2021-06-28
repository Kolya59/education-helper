import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { selectProgramList } from '../../store/selectors/programs.selectors';
import { GetPrograms } from '../../store/actions/programs.actions';
import { selectCurrentRevenue } from '../../store/selectors/receipt.selectors';
import { GetRevenue } from '../../store/actions/receipt.actions';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css'],
})
export class ReceiptsComponent implements OnInit, AfterViewInit {
  receiptForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    program: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  ngAfterViewInit(): void {
    this.loadPrograms();
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
        id: this.receiptForm.value.program,
        from: this.receiptForm.value.from,
        to: this.receiptForm.value.to,
      })
    );
  }

  isLoadUnavailable() {
    return !this.receiptForm.valid;
  }

  getRevenueValue() {
    return this.store.pipe(select(selectCurrentRevenue));
  }
}
