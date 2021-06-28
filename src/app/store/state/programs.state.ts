import { IProgram } from '../../models/program.model';

export interface IProgramState {
  programs: IProgram[];
  selectedProgram: IProgram | null;
}

export const initialProgramState: IProgramState = {
  programs: [],
  selectedProgram: {
    'Идентификатор программы': '',
    'Название программы': '',
    'Стоимость за месяц': '',
    'Табельный номер преподавателя': '',
    'Возрастная категория детей': '',
  },
};
