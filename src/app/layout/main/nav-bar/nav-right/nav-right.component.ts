import {Component} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {User} from '../../../../interfaces/user.interface';
import * as fromRoot from '../../../../ngrx/index';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavRightComponent {
  public visibleUserList = false;
  public chatMessage = false;
  public friendId: number;
  public currentUser$: Observable<User> = null;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {
    this.currentUser$ = this.store.select(fromRoot.getAuthUser);
  }

  onChatToggle(friendID): void {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  public signOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/sign-in');
  }
}
