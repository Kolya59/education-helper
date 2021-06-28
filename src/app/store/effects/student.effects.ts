import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddStudent,
  AddStudentSuccess,
  DeleteStudent,
  DeleteStudentSuccess,
  EStudentActions,
  GetStudent,
  GetStudents,
  GetStudentsSuccess,
  GetStudentSuccess,
  UpdateStudent,
  UpdateStudentSuccess,
} from '../actions/student.actions';
import { IStudent } from '../../models/student.model';
import { selectStudentList } from '../selectors/students.selectors';
import { StudentService } from '../../services/student/student.service';

@Injectable()
export class StudentEffects {
  @Effect()
  getStudent$ = this._actions.pipe(
    ofType<GetStudent>(EStudentActions.GetStudent),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectStudentList))),
    switchMap(([id, students]) => {
      const selectedUser = students.filter(
        (student: IStudent) => student['Код ребенка'] === `${id}`
      )[0];
      return of(new GetStudentSuccess(selectedUser));
    })
  );

  @Effect()
  getStudents$ = this._actions.pipe(
    ofType<GetStudents>(EStudentActions.GetStudents),
    switchMap(() => this._studentService.getStudents()),
    switchMap((studentsHttp: IStudent[]) =>
      of(new GetStudentsSuccess(studentsHttp))
    )
  );

  @Effect()
  addStudent$ = this._actions.pipe(
    ofType<AddStudent>(EStudentActions.AddStudent),
    map((action) => action.payload),
    switchMap((student) => this._studentService.addStudent(student)),
    switchMap((student) => of(new AddStudentSuccess(student)))
  );

  @Effect()
  updateStudent$ = this._actions.pipe(
    ofType<UpdateStudent>(EStudentActions.UpdateStudent),
    map((action) => action.payload),
    switchMap((student) => this._studentService.updateStudent(student)),
    switchMap((student) => of(new UpdateStudentSuccess(student)))
  );

  @Effect()
  deleteStudent$ = this._actions.pipe(
    ofType<DeleteStudent>(EStudentActions.DeleteStudent),
    map((action) => action.payload),
    switchMap((student) => this._studentService.deleteStudent(student)),
    switchMap((student) => of(new DeleteStudentSuccess(student)))
  );

  constructor(
    private _studentService: StudentService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
