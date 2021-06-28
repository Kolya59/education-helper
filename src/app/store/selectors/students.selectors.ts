import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IStudentState } from '../state/students.state';

const selectStudents = (state: IAppState) => state.student;

export const selectStudentList = createSelector(
  selectStudents,
  (state: IStudentState) => state.students
);

export const selectSelectedStudent = createSelector(
  selectStudents,
  (state: IStudentState) => state.selectedStudent
);
