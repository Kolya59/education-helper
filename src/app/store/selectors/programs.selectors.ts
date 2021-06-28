import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IProgramState } from '../state/programs.state';

const selectPrograms = (state: IAppState) => state.program;

export const selectProgramList = createSelector(
  selectPrograms,
  (state: IProgramState) => state.programs
);

export const selectSelectedProgram = createSelector(
  selectPrograms,
  (state: IProgramState) => state.selectedProgram
);
