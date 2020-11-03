import {Action} from '@ngrx/store';
import {User} from '../../interfaces/user.interface';

export const SET_CURRENT_USER = '[CURRENT_USER] Set';
export const CLEAR_CURRENT_USER = '[CURRENT_USER] Clear';

export class SetCurrentUser implements Action {
  readonly type: string = SET_CURRENT_USER;

  constructor(public payload: User) {
  }
}

export class ClearCurrentUser implements Action {
  readonly type: string = CLEAR_CURRENT_USER;

  constructor(public payload: void) {
  }
}

export type Actions = SetCurrentUser | ClearCurrentUser;
