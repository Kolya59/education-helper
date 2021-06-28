import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { IStudent } from '../../models/student.model';
import {
  selectSelectedStudent,
  selectStudentList,
} from '../../store/selectors/students.selectors';
import {
  AddStudent,
  SelectStudent,
  GetStudents,
  UpdateStudent,
  DeleteStudent,
} from '../../store/actions/student.actions';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { selectErrors } from '../../store/selectors/error.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  public noData: IStudent[] = [<IStudent>{}];
  public columnsToDisplay: string[] = [
    'Код ребенка',
    'Фамилия ребенка',
    'Имя ребенка',
    'Дата рождения',
    'Имя отчество родителя',
    'Контактный телефон',
  ];
  public dataSource: MatTableDataSource<IStudent> = new MatTableDataSource(
    this.noData
  );
  studentForm = new FormGroup({
    surname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    parent: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectStudentList))
      .subscribe((students) => this.initializeData(students));
  }

  ngAfterViewInit(): void {
    this.loadStudents();
  }

  selectStudent(student: IStudent | null) {
    console.log(student);
    if (student) {
      this.studentForm.patchValue({
        surname: student['Фамилия ребенка'],
        name: student['Имя ребенка'],
        birthdate: student['Дата рождения'],
        parent: student['Имя отчество родителя'],
        phone: student['Контактный телефон'],
      });
    } else {
      this.studentForm.reset();
    }
    this.store.dispatch(new SelectStudent(student));
  }

  isSelectedStudent(student: IStudent): Observable<boolean> {
    return this.store
      .select(selectSelectedStudent)
      .pipe(
        map((next) =>
          next ? next['Код ребенка'] == student['Код ребенка'] : false
        )
      );
  }

  hasSelectedStudent(): Observable<boolean> {
    return this.store.select(selectSelectedStudent).pipe(map((next) => !!next));
  }

  getErrorsSub(): Observable<string[]> {
    return this.store.select(selectErrors);
  }

  isAddUnavailable(): Observable<boolean> {
    return this.hasSelectedStudent().pipe(
      map((next) => next || !this.studentForm.valid)
    );
  }

  isDeleteUnavailable(): Observable<boolean> {
    return this.hasSelectedStudent().pipe(map((next) => !next));
  }

  isEditUnavailable(): Observable<boolean> {
    return this.hasSelectedStudent().pipe(
      map((next) => !next || !this.studentForm.valid)
    );
  }

  addStudent() {
    console.log('add', this.studentForm.value);
    this.store.dispatch(
      new AddStudent({
        'Код ребенка': '0',
        'Фамилия ребенка': this.studentForm.value.surname,
        'Имя ребенка': this.studentForm.value.name,
        'Дата рождения': this.studentForm.value.birthdate,
        'Имя отчество родителя': this.studentForm.value.parent,
        'Контактный телефон': this.studentForm.value.phone,
      })
    );
    this.loadStudents();
  }

  editStudent() {
    console.log('edit', this.studentForm.value);
    this.store
      .select(selectSelectedStudent)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(
            new UpdateStudent({
              'Код ребенка': next['Код ребенка'],
              'Фамилия ребенка': this.studentForm.value.surname,
              'Имя ребенка': this.studentForm.value.name,
              'Дата рождения': this.studentForm.value.birthdate,
              'Имя отчество родителя': this.studentForm.value.parent,
              'Контактный телефон': this.studentForm.value.phone,
            })
          );
          this.loadStudents();
        }
      });
  }

  deleteStudent() {
    console.log('delete', this.studentForm.value);
    this.store
      .select(selectSelectedStudent)
      .pipe(take(1))
      .subscribe((next) => {
        if (next) {
          this.store.dispatch(new DeleteStudent(next));
          this.loadStudents();
        }
      });
  }

  private loadStudents(): void {
    this.studentForm.reset();
    this.selectStudent(null);
    this.store.dispatch(new GetStudents());
  }

  private initializeData(students: IStudent[]): void {
    this.dataSource = new MatTableDataSource(
      students.length ? students : this.noData
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      this.selectStudent(null);
    }
  }
}
