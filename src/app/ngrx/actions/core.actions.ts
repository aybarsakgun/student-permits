import {Action} from '@ngrx/store';

export enum CoreActions {
  GetConfigs = '[Core/Config] GetConfigs',
  GetConfigsSuccess = '[Core/Config] GetConfigsSuccess',
  GetConfigsFail = '[Core/Config] GetConfigsFail',
}

export class GetConfigs implements Action {
  readonly type = CoreActions.GetConfigs;
}

export class GetConfigsSuccess implements Action {
  readonly type = CoreActions.GetConfigsSuccess;

  constructor(public payload: any) {
  }
}

export class GetConfigsFail implements Action {
  readonly type = CoreActions.GetConfigsFail;
}

export type CoreAction = GetConfigs | GetConfigsSuccess | GetConfigsFail;
