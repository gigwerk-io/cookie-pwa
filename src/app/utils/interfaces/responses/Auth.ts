import {User} from '../models/User';

export interface ValidToken {
  validToken: boolean;
}

export interface Login {
  token: string;
  user: User;
}
