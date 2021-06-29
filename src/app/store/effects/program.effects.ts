import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddProgram,
  AddProgramSuccess,
  DeleteProgram,
  DeleteProgramSuccess,
  EProgramActions,
  SelectProgram,
  GetPrograms,
  GetProgramsSuccess,
  SelectProgramSuccess,
  UpdateProgram,
  UpdateProgramSuccess,
} from '../actions/program.actions';
import { IProgram } from '../../models/program.model';
import { selectProgramList } from '../selectors/program.selectors';
import { ProgramService } from '../../services/program/program.service';
import { AddError } from '../actions/error.actions';

@Injectable()
export class ProgramEffects {
  @Effect()
  selectProgram$ = this._actions.pipe(
    ofType<SelectProgram>(EProgramActions.SelectProgram),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectProgramList))),
    switchMap(([selected, programs]) => {
      if (!selected) {
        return of(new SelectProgramSuccess(null));
      }
      const selectedProgram = programs.filter(
        (program: IProgram) =>
          program['Идентификатор программы'] ===
          `${selected['Идентификатор программы']}`
      )[0];
      return of(new SelectProgramSuccess(selectedProgram));
    })
  );

  @Effect()
  getPrograms$ = this._actions.pipe(
    ofType<GetPrograms>(EProgramActions.GetPrograms),
    switchMap(() => this._programService.getPrograms()),
    switchMap((programsHttp: IProgram[]) =>
      of(new GetProgramsSuccess(programsHttp))
    ),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  addProgram$ = this._actions.pipe(
    ofType<AddProgram>(EProgramActions.AddProgram),
    map((action) => action.payload),
    switchMap((program) => this._programService.addProgram(program)),
    switchMap((program) => of(new AddProgramSuccess(program))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  updateProgram$ = this._actions.pipe(
    ofType<UpdateProgram>(EProgramActions.UpdateProgram),
    map((action) => action.payload),
    switchMap((program) => this._programService.updateProgram(program)),
    switchMap((program) => of(new UpdateProgramSuccess(program))),
    catchError((error) => of(new AddError(error)))
  );

  @Effect()
  deleteProgram$ = this._actions.pipe(
    ofType<DeleteProgram>(EProgramActions.DeleteProgram),
    map((action) => action.payload),
    switchMap(async (program: IProgram) => {
      let res: IProgram;
      try {
        res = await this._programService.deleteProgram(program);
      } catch (error) {
        return of(new AddError(error));
      }
      return of(new DeleteProgramSuccess(res));
    })
  );

  constructor(
    private _programService: ProgramService,
    private _actions: Actions,
    private _store: Store<IAppState>
  ) {}
}
