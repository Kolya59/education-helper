import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { IProgram } from '../../models/program.model';
import {
  selectSelectedProgram,
  selectProgramList,
} from '../../store/selectors/program.selectors';
import {
  AddProgram,
  SelectProgram,
  GetPrograms,
  UpdateProgram,
  DeleteProgram,
} from '../../store/actions/program.actions';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectErrors } from '../../store/selectors/error.selectors';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit, AfterViewInit {
  public noData: IProgram[] = [<IProgram>{}];
  public columnsToDisplay: string[] = [
    'Идентификатор программы',
    'Название программы',
    'Стоимость за месяц',
    'Табельный номер преподавателя',
    'Возрастная категория детей',
  ];
  public dataSource: MatTableDataSource<IProgram> = new MatTableDataSource(
    this.noData
  );
  programForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    teacherNumber: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectProgramList))
      .subscribe((programs) => this.initializeData(programs));
  }

  ngAfterViewInit(): void {
    this.loadPrograms();
  }

  selectProgram(program: IProgram | null) {
    console.log(program);
    if (program) {
      this.programForm.patchValue({
        name: program['Название программы'],
        cost: program['Стоимость за месяц'],
        teacherNumber: program['Табельный номер преподавателя'],
        category: program['Возрастная категория детей'],
      });
    } else {
      this.programForm.reset();
    }
    this.store.dispatch(new SelectProgram(program));
  }

  isSelectedProgram(program: IProgram): Observable<boolean> {
    return this.store
      .select(selectSelectedProgram)
      .pipe(
        map((next) =>
          next
            ? next['Идентификатор программы'] ==
              program['Идентификатор программы']
            : false
        )
      );
  }

  hasSelectedProgram(): Observable<boolean> {
    return this.store.select(selectSelectedProgram).pipe(map((next) => !!next));
  }

  getErrorsSub(): Observable<string[]> {
    return this.store.select(selectErrors);
  }

  isAddUnavailable(): Observable<boolean> {
    return this.hasSelectedProgram().pipe(
      map((next) => next || !this.programForm.valid)
    );
  }

  isDeleteUnavailable(): Observable<boolean> {
    return this.hasSelectedProgram().pipe(map((next) => !next));
  }

  isEditUnavailable(): Observable<boolean> {
    return this.hasSelectedProgram().pipe(
      map((next) => !next || !this.programForm.valid)
    );
  }

  addProgram() {
    console.log('add', this.programForm.value);
    this.store.dispatch(
      new AddProgram({
        'Идентификатор программы': '0',
        'Название программы': this.programForm.value.name,
        'Стоимость за месяц': this.programForm.value.cost,
        'Табельный номер преподавателя': this.programForm.value.teacherNumber,
        'Возрастная категория детей': this.programForm.value.category,
      })
    );
    this.loadPrograms();
  }

  editProgram() {
    console.log('edit', this.programForm.value);
    this.store
      .select(selectSelectedProgram)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(
            new UpdateProgram({
              'Идентификатор программы': next['Идентификатор программы'],
              'Название программы': this.programForm.value.name,
              'Стоимость за месяц': this.programForm.value.cost,
              'Табельный номер преподавателя':
                this.programForm.value.teacherNumber,
              'Возрастная категория детей': this.programForm.value.category,
            })
          );
          this.loadPrograms();
        }
      });
  }

  deleteProgram() {
    console.log('delete', this.programForm.value);
    this.store
      .select(selectSelectedProgram)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(new DeleteProgram(next));
          this.loadPrograms();
        }
      });
  }

  private loadPrograms(): void {
    this.programForm.reset();
    this.selectProgram(null);
    this.store.dispatch(new GetPrograms());
  }

  private initializeData(programs: IProgram[]): void {
    this.dataSource = new MatTableDataSource(
      programs.length ? programs : this.noData
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.selectProgram(null);
    }
  }
}
