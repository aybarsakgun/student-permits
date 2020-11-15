import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as _authActions from '../actions/auth.actions';
import {AuthActions} from '../actions/auth.actions';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  @Effect() fetchUser$: Observable<Action> = this.authActions.pipe(
    ofType(AuthActions.GetUser),
    switchMap(() => this.authService.fetchUser()),
    map(res => new _authActions.CurrentUser(res)),
    catchError(() => of(new _authActions.GetUserFail()))
  );

  @Effect({dispatch: false}) failUser$: Observable<Action> = this.authActions.pipe(
    ofType(AuthActions.GetUserFail),
    tap(() => this.authService.signOut())
  );

  constructor(
    private authActions: Actions,
    private authService: AuthService
  ) {
  }

}
