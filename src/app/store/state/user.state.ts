import { IUser } from '../../models/user.model';

export interface IUserState {
  currentUser: IUser | null;
}

export const initialUserState: IUserState = {
  currentUser: null,
};
