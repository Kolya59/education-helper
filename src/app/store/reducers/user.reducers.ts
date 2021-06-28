import { EUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../state/user.state';

export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUserSuccess:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
