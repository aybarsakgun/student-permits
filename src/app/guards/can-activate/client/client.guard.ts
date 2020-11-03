import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '../../../services/auth/auth.service';
import {AUTH_STATUS} from '../../../enums/auth-status.enum';

@Injectable()
export class ClientGuard implements CanActivate {
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
          case AUTH_STATUS.PUBLIC:
            this.router.navigateByUrl('/sign-in');
            return resolve(false);
          case AUTH_STATUS.CLIENT:
            return resolve(true);
        }
      });
    });
  }
}
