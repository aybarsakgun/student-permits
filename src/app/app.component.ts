import {Component, OnDestroy, OnInit} from '@angular/core';
import {AUTH_STATUS} from './enums/auth-status.enum';
import {Subscription} from 'rxjs';
import {User} from './interfaces/user.interface';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;
  private authStatusSub: Subscription = null;

  public currentUser: User = null;
  private currentUserSub: Subscription = null;

  constructor(private auth: AuthService) {
  }

  /**
   * @returns void
   */
  public ngOnInit(): void {
    try {
      this.currentUserSub = this.auth.currentUser$.subscribe((user: User) => this.currentUser = user);
      this.authStatusSub = this.auth.status$.subscribe((status: AUTH_STATUS) => this.authStatus = status);
    } catch (err) {
      console.warn('[ERROR] AppComponent.ngOnInit:', err);
    }
  }

  /**
   * @returns void
   */
  public ngOnDestroy(): void {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
  }

  /**
   * @returns void
   */
  public SignOut(): void {
    this.auth.SignOut();
  }
}
