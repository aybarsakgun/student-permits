import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '../../../services/auth/auth.service';
import {AUTH_STATUS} from '../../../enums/auth-status.enum';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }

  /**
   * @returns Promise<boolean>
   */
  public canActivate(): Promise<boolean> {
    return new Promise((resolve: (result: boolean) => void) => {
      this.auth.status$.subscribe((status: AUTH_STATUS) => {
        switch (status) {
          case AUTH_STATUS.LOADING:
            break;
          case AUTH_STATUS.NOT_LOGGED_IN:
            return resolve(true);
          case AUTH_STATUS.LOGGED_IN:
            this.router.navigateByUrl('/');
            return resolve(false);
        }
      });
    });
  }
}
