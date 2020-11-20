import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../ngrx';
import {Config} from '../../../interfaces/config.interface';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private store: Store<fromRoot.State>) {
  }

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      switchMap((status: boolean) => {
        if (!status) {
          this.router.navigateByUrl('/auth/sign-in');
          return of(false);
        }
        return this.store.select(fromRoot.getConfigsLoading).pipe(
          filter(loading => !loading),
          withLatestFrom(this.store.select(fromRoot.getConfigs)),
          take(1),
          map(([_, config]: [boolean, Config]) => !!(config)),
          switchMap((config: boolean) => {
            if (config) {
              return of(true);
            }
            this.router.navigateByUrl('/error');
            return of(false);
          })
        );
      }),
      catchError(() => {
        this.router.navigateByUrl('/auth/sign-in');
        return of(false);
      })
    );
  }
}
