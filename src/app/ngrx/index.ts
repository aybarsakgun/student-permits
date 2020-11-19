import { createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducers';
import * as fromCore from './reducers/core.reducers';

export interface State {
  auth: fromAuth.State;
  core: fromCore.State;
}

export const reducers = {
  auth: fromAuth.authReducer,
  core: fromCore.coreReducer
};

export const Auth = (state: State) => state.auth;
export const Core = (state: State) => state.core;

export const getAuthUser = createSelector(Auth, fromAuth.user);
export const getAuthUserLoading = createSelector(Auth, fromAuth.loading);

export const getConfigs = createSelector(Core, fromCore.configs);
export const getConfigsLoading = createSelector(Core, fromCore.loading);

export const getCore = createSelector(Core, fromCore.core);
