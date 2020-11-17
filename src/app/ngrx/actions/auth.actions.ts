import {Action} from '@ngrx/store';

export enum AuthActions {
  GetUser = '[Auth] GetUser',
  GetUserFail = '[Auth] GetUserFail',
  CurrentUser = '[Auth] CurrentUser',
}

export class GetUser implements Action {
  readonly type = AuthActions.GetUser;
}

export class GetUserFail implements Action {
  readonly type = AuthActions.GetUserFail;
}

export class CurrentUser implements Action {
  readonly type = AuthActions.CurrentUser;

  constructor(public payload: any) {
  }
}

export type AuthAction = GetUser | GetUserFail | CurrentUser;
