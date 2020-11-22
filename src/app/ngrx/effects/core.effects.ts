import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType,} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as _coreActions from '../actions/core.actions';
import {CoreActions, SetAccessToken} from '../actions/core.actions';
import {CoreService} from '../../services/core/core.service';
import * as fromRoot from '../index';
import {Router} from '@angular/router';

@Injectable()
export class CoreEffects {
  @Effect() fetchCore$: Observable<Action> = this.coreActions.pipe(
    ofType(CoreActions.FetchCore),
    switchMap(() => this.coreService.fetchCore()),
    map((result) => {
      if (result.user && result.config) {
        this.router.navigateByUrl('/dashboard');
        return new _coreActions.FetchingCoreSuccess(result);
      }
    }),
    catchError(({message}) => {
      return of(new _coreActions.FetchingCoreFail({errors: [message]}));
    })
  );

  @Effect({dispatch: false}) coreFetchingFailed$: Observable<Action> = this.coreActions.pipe(
    ofType(CoreActions.FetchingCoreFail),
    tap(() => this.coreService.removeAccessToken())
  );

  @Effect() accessTokenChanged$: Observable<Action> = this.coreActions.pipe(
    ofType(CoreActions.SetAccessToken),
    map((action: SetAccessToken) => {
      this.coreService.setAccessToken(action.payload);
      return new _coreActions.FetchCore();
    }),
  );

  @Effect({dispatch: false}) logout$: Observable<Action> = this.coreActions.pipe(
    ofType(CoreActions.Logout),
    tap(() => {
      this.coreService.removeAccessToken();
      this.router.navigateByUrl('/auth/sign-in');
    })
  );

  constructor(
    private coreActions: Actions,
    private store: Store<fromRoot.State>,
    private coreService: CoreService,
    private router: Router
  ) {
  }

}
