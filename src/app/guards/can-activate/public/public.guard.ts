import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      switchMap((status: boolean) => {
        if (status) {
          this.router.navigateByUrl('/dashboard');
          return of(false);
        }
        return of(true);
      }),
      catchError(() => {
        this.router.navigateByUrl('/dashboard');
        return of(false);
      })
    );
  }
}
