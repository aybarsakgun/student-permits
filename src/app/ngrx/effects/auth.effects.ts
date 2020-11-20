import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as _authActions from '../actions/auth.actions';
import * as _coreActions from '../actions/core.actions';
import {AuthActions} from '../actions/auth.actions';
import {AuthService} from '../../services/auth/auth.service';
import * as fromRoot from '../index';

@Injectable()
export class AuthEffects {
  @Effect() fetchUser$: Observable<Action> = this.authActions.pipe(
    ofType(AuthActions.GetUser),
    switchMap(() => this.authService.fetchUser()),
    map(res => {
      if (res) {
        this.store.dispatch(new _coreActions.GetConfigs());
        return new _authActions.CurrentUser(res);
      }
    }),
    catchError(() => of(new _authActions.GetUserFail()))
  );

  @Effect({dispatch: false}) failUser$: Observable<Action> = this.authActions.pipe(
    ofType(AuthActions.GetUserFail),
    tap(() => this.authService.signOut())
  );

  constructor(
    private store: Store<fromRoot.State>,
    private authActions: Actions,
    private authService: AuthService
  ) {
  }

}
