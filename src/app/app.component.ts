import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from './ngrx/index';
import * as _coreActions from './ngrx/actions/core.actions';
import {CoreService} from './services/core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private coreService: CoreService
  ) {
    const accessToken = this.coreService.getAccessToken();
    if (accessToken) {
      this.store.dispatch(new _coreActions.SetAccessToken(accessToken));
    }
  }
}
