import { IStudent } from '../../models/student.model';

export interface IStudentState {
  students: IStudent[];
  selectedStudent: IStudent;
}

export const initialStudentState: IStudentState = {
  students: [],
  selectedStudent: {
    'Код ребенка': '',
    'Фамилия ребенка': '',
    'Имя ребенка': '',
    'Дата рождения': '',
    'Имя отчество родителя': '',
    'Контактный телефон': '',
  },
};
