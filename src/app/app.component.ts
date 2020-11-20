import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from './ngrx/index';
import * as _authActions from './ngrx/actions/auth.actions';
import {take} from 'rxjs/operators';
import {accessTokenKey} from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getAuthUser).pipe(
      take(1)
    ).subscribe(user => {
      const accessToken: string = localStorage.getItem(accessTokenKey);
      if (!user && accessToken) {
        this.store.dispatch(new _authActions.CurrentUser({
          accessToken
        }));
        this.store.dispatch(new _authActions.GetUser());
      } else if (!user && !accessToken) {
        this.store.dispatch(new _authActions.GetUserFail());
      }
    });
    // this.store.select(fromRoot.getCore).subscribe(data => console.log(data));
  }
}
