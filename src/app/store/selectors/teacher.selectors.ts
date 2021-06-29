import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { ITeacherState } from '../state/teacher.state';

const selectTeachers = (state: IAppState) => state.teacher;

export const selectTeacherList = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.teachers
);

export const selectSelectedTeacher = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.selectedTeacher
);
