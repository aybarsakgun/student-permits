import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../ngrx';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
  }

  public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(fromRoot.getCore).pipe(
      filter((core) => !core.loading),
      take(1),
      switchMap((core) => {
        if (!core.user && !core.config) {
          this.router.navigateByUrl('/auth/sign-in');
          return of(false);
        }
        if (activatedRouteSnapshot.data.hasOwnProperty('accessibleRoles')
          && !activatedRouteSnapshot.data.accessibleRoles.includes(core.user.role)) {
          this.router.navigateByUrl('/dashboard');
          return of(false);
        }
        return of(true);
      })
    );
  }
}
