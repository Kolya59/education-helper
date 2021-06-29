import { Action } from '@ngrx/store';
import { IProgram } from '../../models/program.model';

export enum EProgramActions {
  SelectProgram = '[Program] Select Program',
  SelectProgramSuccess = '[Program] Select Program Success',

  GetPrograms = '[Program] Get Programs',
  GetProgramsSuccess = '[Program] Get Programs Success',

  AddProgram = '[Program] Add Program',
  AddProgramSuccess = '[Program] Add Program Success',

  UpdateProgram = '[Program] Update Program',
  UpdateProgramSuccess = '[Program] Update Program Success',

  DeleteProgram = '[Program] Delete Program',
  DeleteProgramSuccess = '[Program] Delete Program Success',
}

export class SelectProgram implements Action {
  public readonly type = EProgramActions.SelectProgram;
  constructor(public payload: IProgram | null) {}
}

export class SelectProgramSuccess implements Action {
  public readonly type = EProgramActions.SelectProgramSuccess;
  constructor(public payload: IProgram | null) {}
}

export class GetPrograms implements Action {
  public readonly type = EProgramActions.GetPrograms;
}

export class GetProgramsSuccess implements Action {
  public readonly type = EProgramActions.GetProgramsSuccess;
  constructor(public payload: IProgram[]) {}
}

export class AddProgram implements Action {
  public readonly type = EProgramActions.AddProgram;
  constructor(public payload: IProgram) {}
}

export class AddProgramSuccess implements Action {
  public readonly type = EProgramActions.AddProgramSuccess;
  constructor(public payload: IProgram) {}
}

export class UpdateProgram implements Action {
  public readonly type = EProgramActions.UpdateProgram;
  constructor(public payload: IProgram) {}
}

export class UpdateProgramSuccess implements Action {
  public readonly type = EProgramActions.UpdateProgramSuccess;
  constructor(public payload: IProgram) {}
}

export class DeleteProgram implements Action {
  public readonly type = EProgramActions.DeleteProgram;
  constructor(public payload: IProgram) {}
}

export class DeleteProgramSuccess implements Action {
  public readonly type = EProgramActions.DeleteProgramSuccess;
  constructor(public payload: IProgram) {}
}

export type ProgramActions =
  | SelectProgram
  | SelectProgramSuccess
  | GetPrograms
  | GetProgramsSuccess
  | AddProgram
  | AddProgramSuccess
  | UpdateProgram
  | UpdateProgramSuccess
  | DeleteProgram
  | DeleteProgramSuccess;
