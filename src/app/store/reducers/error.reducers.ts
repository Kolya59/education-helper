import { IErrorState, initialErrorState } from '../state/error.state';
import { EErrorActions, ErrorActions } from '../actions/error.actions';

export const errorReducers = (
  state = initialErrorState,
  action: ErrorActions
): IErrorState => {
  switch (action.type) {
    case EErrorActions.AddErrorSuccess:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    default:
      return state;
  }
};
