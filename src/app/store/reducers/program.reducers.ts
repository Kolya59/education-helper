import { initialProgramState, IProgramState } from '../state/program.state';
import { EProgramActions, ProgramActions } from '../actions/program.actions';

export const programReducers = (
  state = initialProgramState,
  action: ProgramActions
): IProgramState => {
  switch (action.type) {
    case EProgramActions.SelectProgramSuccess:
      return {
        ...state,
        selectedProgram: action.payload,
      };
    case EProgramActions.GetProgramsSuccess:
      return {
        ...state,
        programs: action.payload,
      };
    case EProgramActions.AddProgramSuccess:
      return <IProgramState>{
        ...state,
        programs: [
          ...state.programs,
          {
            ...action.payload,
            'Идентификатор программы': state.programs.length + 1,
          },
        ],
      };
    case EProgramActions.UpdateProgramSuccess:
      return {
        ...state,
        programs: state.programs.map((v) => {
          if (
            v['Идентификатор программы'] ==
            action.payload['Идентификатор программы']
          ) {
            return action.payload;
          }
          return v;
        }),
      };
    case EProgramActions.DeleteProgramSuccess:
      return {
        ...state,
        programs: state.programs.filter((v) => {
          return (
            v['Идентификатор программы'] !=
            action.payload['Идентификатор программы']
          );
        }),
      };
    default:
      return state;
  }
};
