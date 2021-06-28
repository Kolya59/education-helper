import { IUser } from '../../models/user.model';

export interface IUserState {
  currentUser: IUser;
}

export const initialUserState: IUserState = {
  currentUser: {
    name: '',
    role: '',
    status: false,
  },
};
