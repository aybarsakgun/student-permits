import {Component} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {User} from '../../../../interfaces/user.interface';
import * as fromRoot from '../../../../ngrx/index';
import * as _coreActions from '../../../../ngrx/actions/core.actions';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

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
  public user$: Observable<User> = this.store.select(fromRoot.getCoreUser);

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
  }

  onChatToggle(friendID): void {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  public signOut(): void {
    this.store.dispatch(new _coreActions.Logout());
  }
}
