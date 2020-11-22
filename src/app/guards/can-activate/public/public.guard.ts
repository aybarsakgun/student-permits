import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../ngrx';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.select(fromRoot.getCore).pipe(
      filter((core) => !core.loading),
      take(1),
      switchMap((core) => {
        if (core.user && core.config) {
          this.router.navigateByUrl('/dashboard');
          return of(false);
        }
        return of(true);
      })
    );
  }
}
