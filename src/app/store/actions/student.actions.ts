import { Action } from '@ngrx/store';
import { IStudent } from '../../models/student.model';

export enum EStudentActions {
  SelectStudent = '[Student] Get Student',
  SelectStudentSuccess = '[Student] Get Student Success',

  GetStudents = '[Student] Get Students',
  GetStudentsSuccess = '[Student] Get Students Success',

  AddStudent = '[Student] Add Student',
  AddStudentSuccess = '[Student] Add Student Success',

  UpdateStudent = '[Student] Update Student',
  UpdateStudentSuccess = '[Student] Update Student Success',

  DeleteStudent = '[Student] Delete Student',
  DeleteStudentSuccess = '[Student] Delete Student Success',
}

export class SelectStudent implements Action {
  public readonly type = EStudentActions.SelectStudent;
  constructor(public payload: IStudent | null) {}
}

export class SelectStudentSuccess implements Action {
  public readonly type = EStudentActions.SelectStudentSuccess;
  constructor(public payload: IStudent | null) {}
}

export class GetStudents implements Action {
  public readonly type = EStudentActions.GetStudents;
}

export class GetStudentsSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsSuccess;
  constructor(public payload: IStudent[]) {}
}

export class AddStudent implements Action {
  public readonly type = EStudentActions.AddStudent;
  constructor(public payload: IStudent) {}
}

export class AddStudentSuccess implements Action {
  public readonly type = EStudentActions.AddStudentSuccess;
  constructor(public payload: IStudent) {}
}

export class UpdateStudent implements Action {
  public readonly type = EStudentActions.UpdateStudent;
  constructor(public payload: IStudent) {}
}

export class UpdateStudentSuccess implements Action {
  public readonly type = EStudentActions.UpdateStudentSuccess;
  constructor(public payload: IStudent) {}
}

export class DeleteStudent implements Action {
  public readonly type = EStudentActions.DeleteStudent;
  constructor(public payload: IStudent) {}
}

export class DeleteStudentSuccess implements Action {
  public readonly type = EStudentActions.DeleteStudentSuccess;
  constructor(public payload: IStudent) {}
}

export type StudentActions =
  | SelectStudent
  | SelectStudentSuccess
  | GetStudents
  | GetStudentsSuccess
  | AddStudent
  | AddStudentSuccess
  | UpdateStudent
  | UpdateStudentSuccess
  | DeleteStudent
  | DeleteStudentSuccess;
