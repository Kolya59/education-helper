import { initialStudentState, IStudentState } from '../state/students.state';
import { EStudentActions, StudentActions } from '../actions/student.actions';

export const studentReducers = (
  state = initialStudentState,
  action: StudentActions
): IStudentState => {
  switch (action.type) {
    case EStudentActions.SelectStudentSuccess:
      return {
        ...state,
        selectedStudent: action.payload,
      };
    case EStudentActions.GetStudentsSuccess:
      return {
        ...state,
        students: action.payload,
      };
    case EStudentActions.AddStudentSuccess:
      return <IStudentState>{
        ...state,
        students: [
          ...state.students,
          {
            ...action.payload,
            'Код ребенка': state.students.length + 1,
          },
        ],
      };
    case EStudentActions.UpdateStudentSuccess:
      return {
        ...state,
        students: state.students.map((v) => {
          if (v['Код ребенка'] == action.payload['Код ребенка']) {
            return action.payload;
          }
          return v;
        }),
      };
    case EStudentActions.DeleteStudentSuccess:
      return {
        ...state,
        students: state.students.filter((v) => {
          return v['Код ребенка'] != action.payload['Код ребенка'];
        }),
      };
    default:
      return state;
  }
};
