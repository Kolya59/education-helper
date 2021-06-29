import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { ITeacher } from '../../models/teacher.model';
import {
  selectSelectedTeacher,
  selectTeacherList,
} from '../../store/selectors/teacher.selectors';
import {
  AddTeacher,
  SelectTeacher,
  GetTeachers,
  UpdateTeacher,
  DeleteTeacher,
} from '../../store/actions/teacher.actions';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectErrors } from '../../store/selectors/error.selectors';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit, AfterViewInit {
  public noData: ITeacher[] = [<ITeacher>{}];
  public columnsToDisplay: string[] = [
    'Табельный номер',
    'Фамилия',
    'Имя',
    'Отчество',
    'Стаж в образовательной деятельности',
    'Квалификация',
  ];
  public dataSource: MatTableDataSource<ITeacher> = new MatTableDataSource(
    this.noData
  );
  teacherForm = new FormGroup({
    surname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectTeacherList))
      .subscribe((teachers) => this.initializeData(teachers));
  }

  ngAfterViewInit(): void {
    this.loadTeachers();
  }

  selectTeacher(teacher: ITeacher | null) {
    console.log(teacher);
    if (teacher) {
      this.teacherForm.patchValue({
        surname: teacher['Фамилия'],
        name: teacher['Имя'],
        patronymic: teacher['Отчество'],
        experience: teacher['Стаж в образовательной деятельности'],
        category: teacher['Квалификация'],
      });
    } else {
      this.teacherForm.reset();
    }
    this.store.dispatch(new SelectTeacher(teacher));
  }

  isSelectedTeacher(teacher: ITeacher): Observable<boolean> {
    return this.store
      .select(selectSelectedTeacher)
      .pipe(
        map((next) =>
          next ? next['Табельный номер'] == teacher['Табельный номер'] : false
        )
      );
  }

  hasSelectedTeacher(): Observable<boolean> {
    return this.store.select(selectSelectedTeacher).pipe(map((next) => !!next));
  }

  getErrorsSub(): Observable<string[]> {
    return this.store.select(selectErrors);
  }

  isAddUnavailable(): Observable<boolean> {
    return this.hasSelectedTeacher().pipe(
      map((next) => next || !this.teacherForm.valid)
    );
  }

  isDeleteUnavailable(): Observable<boolean> {
    return this.hasSelectedTeacher().pipe(map((next) => !next));
  }

  isEditUnavailable(): Observable<boolean> {
    return this.hasSelectedTeacher().pipe(
      map((next) => !next || !this.teacherForm.valid)
    );
  }

  addTeacher() {
    console.log('add', this.teacherForm.value);
    this.store.dispatch(
      new AddTeacher({
        'Табельный номер': '0',
        Фамилия: this.teacherForm.value.surname,
        Имя: this.teacherForm.value.name,
        Отчество: this.teacherForm.value.patronymic,
        'Стаж в образовательной деятельности':
          this.teacherForm.value.experience,
        Квалификация: this.teacherForm.value.category,
      })
    );
    this.loadTeachers();
  }

  editTeacher() {
    console.log('edit', this.teacherForm.value);
    this.store
      .select(selectSelectedTeacher)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(
            new UpdateTeacher({
              'Табельный номер': next['Табельный номер'],
              Фамилия: this.teacherForm.value.surname,
              Имя: this.teacherForm.value.name,
              Отчество: this.teacherForm.value.patronymic,
              'Стаж в образовательной деятельности':
                this.teacherForm.value.experience,
              Квалификация: this.teacherForm.value.category,
            })
          );
          this.loadTeachers();
        }
      });
  }

  deleteTeacher() {
    console.log('delete', this.teacherForm.value);
    this.store
      .select(selectSelectedTeacher)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(new DeleteTeacher(next));
          this.loadTeachers();
        }
      });
  }

  private loadTeachers(): void {
    this.teacherForm.reset();
    this.selectTeacher(null);
    this.store.dispatch(new GetTeachers());
  }

  private initializeData(teachers: ITeacher[]): void {
    this.dataSource = new MatTableDataSource(
      teachers.length ? teachers : this.noData
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.selectTeacher(null);
    }
  }
}
