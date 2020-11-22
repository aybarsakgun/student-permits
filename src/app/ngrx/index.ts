import { createSelector } from '@ngrx/store';
import * as fromCore from './reducers/core.reducers';

export interface State {
  core: fromCore.State;
}

export const reducers = {
  core: fromCore.coreReducer
};

export const Core = (state: State) => state.core;

export const getCore = createSelector(Core, fromCore.core);

export const getCoreLoading = createSelector(Core, fromCore.loading);
export const getCoreErrors = createSelector(Core, fromCore.errors);
export const getCoreConfig = createSelector(Core, fromCore.config);
export const getCoreUser = createSelector(Core, fromCore.user);
export const getCoreAccessToken = createSelector(Core, fromCore.accessToken);
