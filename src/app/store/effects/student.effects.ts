import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import {
  AddStudent,
  AddStudentSuccess,
  DeleteStudent,
  DeleteStudentSuccess,
  EStudentActions,
  SelectStudent,
  GetStudents,
  GetStudentsSuccess,
  SelectStudentSuccess,
  UpdateStudent,
  UpdateStudentSuccess,
} from '../actions/student.actions';
import { IStudent } from '../../models/student.model';
import { selectStudentList } from '../selectors/students.selectors';
import { StudentService } from '../../services/student/student.service';
import { AddError } from '../actions/error.actions';

@Injectable()
export class StudentEffects {
  @Effect()
  selectStudent$ = this._actions.pipe(
    ofType<SelectStudent>(EStudentActions.SelectStudent),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectStudentList))),
    switchMap(([selected, students]) => {
      if (!selected) {
        return of(new SelectStudentSuccess(null));
      }
      const selectedStudent = students.filter(
        (student: IStudent) =>
          student['Код ребенка'] === `${selected['Код ребенка']}`
      )[0];
      return of(new SelectStudentSuccess(selectedStudent));
    })
  );

  @Effect()
  getStudents$ = this._actions.pipe(
    ofType<GetStudents>(EStudentActions.GetStudents),
    switchMap(() => this._studentService.getStudents()),
    switchMap((studentsHttp: IStudent[]) =>
      of(new GetStudentsSuccess(studentsHttp))
    ),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  addStudent$ = this._actions.pipe(
    ofType<AddStudent>(EStudentActions.AddStudent),
    map((action) => action.payload),
    switchMap((student) => this._studentService.addStudent(student)),
    switchMap((student) => of(new AddStudentSuccess(student))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  updateStudent$ = this._actions.pipe(
    ofType<UpdateStudent>(EStudentActions.UpdateStudent),
    map((action) => action.payload),
    switchMap((student) => this._studentService.updateStudent(student)),
    switchMap((student) => of(new UpdateStudentSuccess(student))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  deleteStudent$ = this._actions.pipe(
    ofType<DeleteStudent>(EStudentActions.DeleteStudent),
    map((action) => action.payload),
    switchMap((student) => {
      try {
        return this._studentService.deleteStudent(student);
      } catch (e) {
        return throwError(e);
      }
    }),
    switchMap((student) => of(new DeleteStudentSuccess(student))),
    catchError((error) => of(new AddError(error)))
  );

  constructor(
    private _studentService: StudentService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
