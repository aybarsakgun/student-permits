import {Component, OnDestroy, OnInit} from '@angular/core';
import {AUTH_STATUS} from './enums/auth-status.enum';
import {Subscription} from 'rxjs';
import {User} from './interfaces/user.interface';
import {AuthService} from './services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;
  public currentUser: User = null;

  private subscriptions: Subscription[] = [];

  public authStatuses = AUTH_STATUS;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    try {
      this.subscriptions.push(this.auth.currentUser$.subscribe(async (currentUser: User) => {
        this.currentUser = currentUser ? currentUser : this.auth.token ? await this.auth.fetchUser() : null;
      }));
      this.subscriptions.push(this.auth.status$.subscribe((status: AUTH_STATUS) => this.authStatus = status));
    } catch (err) {
      console.warn('[ERROR] AppComponent.ngOnInit:', err);
    }
  }

  /**
   * @returns void
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * @returns void
   */
  public signOut(): void {
    this.auth.signOut();
  }

  public navigate(): void {
    this.router.navigate(['/asdsada']);
  }
}
