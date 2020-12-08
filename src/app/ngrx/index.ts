import { createSelector } from '@ngrx/store';
import * as fromCore from './reducers/core.reducers';
import * as fromLayout from './reducers/layout.reducers';

export interface State {
  core: fromCore.State;
  layout: fromLayout.State;
}

export const reducers = {
  core: fromCore.coreReducer,
  layout: fromLayout.layoutReducer
};

export const Core = (state: State) => state.core;

export const getCore = createSelector(Core, fromCore.core);

export const getCoreLoading = createSelector(Core, fromCore.loading);
export const getCoreErrors = createSelector(Core, fromCore.errors);
export const getCoreConfig = createSelector(Core, fromCore.config);
export const getCoreUser = createSelector(Core, fromCore.user);
export const getCoreAccessToken = createSelector(Core, fromCore.accessToken);

export const Layout = (state: State) => state.layout;

export const getLayout = createSelector(Layout, fromLayout.layout);
