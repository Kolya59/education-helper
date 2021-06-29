import { Action } from '@ngrx/store';
import { ITeacher } from '../../models/teacher.model';

export enum ETeacherActions {
  SelectTeacher = '[Teacher] Select Teacher',
  SelectTeacherSuccess = '[Teacher] Select Teacher Success',

  GetTeachers = '[Teacher] Get Teachers',
  GetTeachersSuccess = '[Teacher] Get Teachers Success',

  AddTeacher = '[Teacher] Add Teacher',
  AddTeacherSuccess = '[Teacher] Add Teacher Success',

  UpdateTeacher = '[Teacher] Update Teacher',
  UpdateTeacherSuccess = '[Teacher] Update Teacher Success',

  DeleteTeacher = '[Teacher] Delete Teacher',
  DeleteTeacherSuccess = '[Teacher] Delete Teacher Success',
}

export class SelectTeacher implements Action {
  public readonly type = ETeacherActions.SelectTeacher;
  constructor(public payload: ITeacher | null) {}
}

export class SelectTeacherSuccess implements Action {
  public readonly type = ETeacherActions.SelectTeacherSuccess;
  constructor(public payload: ITeacher | null) {}
}

export class GetTeachers implements Action {
  public readonly type = ETeacherActions.GetTeachers;
}

export class GetTeachersSuccess implements Action {
  public readonly type = ETeacherActions.GetTeachersSuccess;
  constructor(public payload: ITeacher[]) {}
}

export class AddTeacher implements Action {
  public readonly type = ETeacherActions.AddTeacher;
  constructor(public payload: ITeacher) {}
}

export class AddTeacherSuccess implements Action {
  public readonly type = ETeacherActions.AddTeacherSuccess;
  constructor(public payload: ITeacher) {}
}

export class UpdateTeacher implements Action {
  public readonly type = ETeacherActions.UpdateTeacher;
  constructor(public payload: ITeacher) {}
}

export class UpdateTeacherSuccess implements Action {
  public readonly type = ETeacherActions.UpdateTeacherSuccess;
  constructor(public payload: ITeacher) {}
}

export class DeleteTeacher implements Action {
  public readonly type = ETeacherActions.DeleteTeacher;
  constructor(public payload: ITeacher) {}
}

export class DeleteTeacherSuccess implements Action {
  public readonly type = ETeacherActions.DeleteTeacherSuccess;
  constructor(public payload: ITeacher) {}
}

export type TeacherActions =
  | SelectTeacher
  | SelectTeacherSuccess
  | GetTeachers
  | GetTeachersSuccess
  | AddTeacher
  | AddTeacherSuccess
  | UpdateTeacher
  | UpdateTeacherSuccess
  | DeleteTeacher
  | DeleteTeacherSuccess;
