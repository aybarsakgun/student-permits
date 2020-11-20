import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as _coreActions from '../actions/core.actions';
import {ConfigService} from '../../services/core/config/config.service';
import {CoreActions} from '../actions/core.actions';

@Injectable()
export class CoreEffects {
  @Effect() getConfigs$: Observable<Action> = this.coreActions.pipe(
    ofType(CoreActions.GetConfigs),
    switchMap(() => this.menuService.fetchConfig()),
    map(res => new _coreActions.GetConfigsSuccess(res)),
    catchError(() => of(new _coreActions.GetConfigsFail()))
  );

  constructor(
    private coreActions: Actions,
    private menuService: ConfigService
  ) {
  }

}
