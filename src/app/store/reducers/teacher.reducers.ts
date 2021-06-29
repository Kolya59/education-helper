import { initialTeacherState, ITeacherState } from '../state/teacher.state';
import { ETeacherActions, TeacherActions } from '../actions/teacher.actions';

export const teacherReducers = (
  state = initialTeacherState,
  action: TeacherActions
): ITeacherState => {
  switch (action.type) {
    case ETeacherActions.SelectTeacherSuccess:
      return {
        ...state,
        selectedTeacher: action.payload,
      };
    case ETeacherActions.GetTeachersSuccess:
      return {
        ...state,
        teachers: action.payload,
      };
    case ETeacherActions.AddTeacherSuccess:
      return <ITeacherState>{
        ...state,
        teachers: [
          ...state.teachers,
          {
            ...action.payload,
            'Табельный номер': state.teachers.length,
          },
        ],
      };
    case ETeacherActions.UpdateTeacherSuccess:
      return {
        ...state,
        teachers: state.teachers.map((v) => {
          if (v['Табельный номер'] == action.payload['Табельный номер']) {
            return action.payload;
          }
          return v;
        }),
      };
    case ETeacherActions.DeleteTeacherSuccess:
      return {
        ...state,
        teachers: state.teachers.filter((v) => {
          return v['Табельный номер'] != action.payload['Табельный номер'];
        }),
      };
    default:
      return state;
  }
};
