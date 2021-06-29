import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddTeacher,
  AddTeacherSuccess,
  DeleteTeacher,
  DeleteTeacherSuccess,
  ETeacherActions,
  SelectTeacher,
  GetTeachers,
  GetTeachersSuccess,
  SelectTeacherSuccess,
  UpdateTeacher,
  UpdateTeacherSuccess,
} from '../actions/teacher.actions';
import { ITeacher } from '../../models/teacher.model';
import { selectTeacherList } from '../selectors/teacher.selectors';
import { TeacherService } from '../../services/teacher/teacher.service';
import { AddError } from '../actions/error.actions';

@Injectable()
export class TeacherEffects {
  @Effect()
  selectTeacher$ = this._actions.pipe(
    ofType<SelectTeacher>(ETeacherActions.SelectTeacher),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectTeacherList))),
    switchMap(([selected, teachers]) => {
      if (!selected) {
        return of(new SelectTeacherSuccess(null));
      }
      const selectedTeacher = teachers.filter(
        (teacher: ITeacher) =>
          teacher['Табельный номер'] === `${selected['Табельный номер']}`
      )[0];
      return of(new SelectTeacherSuccess(selectedTeacher));
    })
  );

  @Effect()
  getTeachers$ = this._actions.pipe(
    ofType<GetTeachers>(ETeacherActions.GetTeachers),
    switchMap(() => this._teacherService.getTeachers()),
    switchMap((teachersHttp: ITeacher[]) =>
      of(new GetTeachersSuccess(teachersHttp))
    ),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  addTeacher$ = this._actions.pipe(
    ofType<AddTeacher>(ETeacherActions.AddTeacher),
    map((action) => action.payload),
    switchMap((teacher) => this._teacherService.addTeacher(teacher)),
    switchMap((teacher) => of(new AddTeacherSuccess(teacher))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  updateTeacher$ = this._actions.pipe(
    ofType<UpdateTeacher>(ETeacherActions.UpdateTeacher),
    map((action) => action.payload),
    switchMap((teacher) => this._teacherService.updateTeacher(teacher)),
    switchMap((teacher) => of(new UpdateTeacherSuccess(teacher))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  deleteTeacher$ = this._actions.pipe(
    ofType<DeleteTeacher>(ETeacherActions.DeleteTeacher),
    map((action) => action.payload),
    switchMap(async (teacher: ITeacher) => {
      let res: ITeacher;
      try {
        res = await this._teacherService.deleteTeacher(teacher);
      } catch (error) {
        return of(new AddError(error));
      }
      return of(new DeleteTeacherSuccess(res));
    })
  );

  constructor(
    private _teacherService: TeacherService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
