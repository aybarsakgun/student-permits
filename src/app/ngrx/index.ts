import { createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducers';

export interface State {
  auth: fromAuth.State;
}

export const reducers = {
  auth: fromAuth.appReducer,
};

export const Auth = (state: State) => state.auth;

export const getAuthUser = createSelector(Auth, fromAuth.user);
export const getAuthUserLoading = createSelector(Auth, fromAuth.loading);
