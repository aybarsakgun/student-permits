import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BASE_URL} from '../../../../../environments/environment';
import * as _coreActions from '../../../../ngrx/actions/core.actions';
import * as fromRoot from '../../../../ngrx/index';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {accessTokenKey, appName} from '../../../../constants';
import {CoreService} from '../../../../services/core/core.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public loggingIn$: Observable<boolean> = this.store.select(fromRoot.getCoreLoading);
  public errors$: Observable<string[]> = this.store.select(fromRoot.getCoreErrors);
  public appName = appName;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private coreService: CoreService,
    private store: Store<fromRoot.State>
  ) {
    this.titleService.setTitle('Sign In - ' + appName);
    const queryParams: ParamMap = this.activatedRoute.snapshot.queryParamMap;
    if (queryParams.has(accessTokenKey)) {
      const accessToken = queryParams.get(accessTokenKey);
      const accessTokenType = atob(accessToken.split('.')[0]);
      if (accessTokenType && accessTokenType.includes('JWT')) {
        this.store.dispatch(new _coreActions.SetAccessToken(accessToken));
      } else {
        this.store.dispatch(new _coreActions.FetchingCoreFail({
          errors: ['The e-mail address you signed in is not registered in our system.']
        }));
      }
    }
  }

  public signIn(): void {
    window.location.href = `${BASE_URL}/auth/google`;
  }

}
