import { ITeacher } from '../../models/teacher.model';

export interface ITeacherState {
  teachers: ITeacher[];
  selectedTeacher: ITeacher | null;
}

export const initialTeacherState: ITeacherState = {
  teachers: [],
  selectedTeacher: {
    'Табельный номер': '',
    Фамилия: '',
    Имя: '',
    Отчество: '',
    'Стаж в образовательной деятельности': '',
    Квалификация: '',
  },
};
