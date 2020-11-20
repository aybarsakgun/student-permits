import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BASE_URL} from '../../../../../environments/environment';
import * as _authActions from '../../../../ngrx/actions/auth.actions';
import * as fromRoot from '../../../../ngrx/index';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../../../interfaces/user.interface';
import {appName} from '../../../../constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public currentUser$: Observable<User> = null;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.titleService.setTitle('Sign In - ' + appName);
    const queryParams: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    if (queryParams.has('accessToken')) {
      this.currentUser$ = this.store.select(fromRoot.getAuthUser);
      const accessToken: string = queryParams.get('accessToken');
      this.store.dispatch(new _authActions.CurrentUser({
        accessToken
      }));
      this.store.dispatch(new _authActions.GetUser());
      this.router.navigateByUrl('/dashboard');
    }
  }

  public signIn(): void {
    window.location.href = `${BASE_URL}/auth/google`;
  }

}
