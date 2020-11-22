import {Action} from '@ngrx/store';
import {Config} from '../../interfaces/config.interface';
import {User} from '../../interfaces/user.interface';

export enum CoreActions {
  FetchCore = '[Core] FetchCore',
  FetchingCoreSuccess = '[Core] FetchingCoreSuccess',
  FetchingCoreFail = '[Core] FetchingCoreFail',
  SetAccessToken = '[Core] SetAccessToken',
  Logout = '[Core] Logout',
}

export class FetchCore implements Action {
  readonly type = CoreActions.FetchCore;
}

export class FetchingCoreSuccess implements Action {
  readonly type = CoreActions.FetchingCoreSuccess;

  constructor(public payload: {
    config: Config,
    user: User
  }) {
  }
}

export class FetchingCoreFail implements Action {
  readonly type = CoreActions.FetchingCoreFail;

  constructor(public payload: {
    errors: string[]
  }) {
  }
}

export class SetAccessToken implements Action {
  readonly type = CoreActions.SetAccessToken;

  constructor(public payload: string) {
  }
}

export class Logout implements Action {
  readonly type = CoreActions.Logout;
}

export type CoreAction = FetchCore | FetchingCoreSuccess | FetchingCoreFail | SetAccessToken | Logout;
