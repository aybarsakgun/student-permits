import {Component, HostListener} from '@angular/core';
import {appName} from '../../../constants';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../ngrx';
import * as _layoutActions from '../../../ngrx/actions/layout.actions';
import {Observable} from 'rxjs';
import * as fromLayout from '../../../ngrx/reducers/layout.reducers';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public windowWidth: number;
  public appName = appName;
  public layoutStates$: Observable<fromLayout.State> = this.store.select(fromRoot.getLayout);

  @HostListener('window:resize', ['$event'])
  private onResize(event: UIEvent): void {
    this.windowWidth = (event.target as Window).innerWidth;
  }

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.windowWidth = window.innerWidth;
  }

  toggleNavigationBar(): void {
    if (this.windowWidth >= 992) {
      this.store.dispatch(new _layoutActions.NavigationBarToggle());
    } else {
      this.store.dispatch(new _layoutActions.MobileHeaderBarToggle(true));
      this.store.dispatch(new _layoutActions.MobileNavigationBarToggle());
    }
  }

  toggleMobileHeaderBar(): void {
    this.store.dispatch(new _layoutActions.MobileHeaderBarToggle());
  }
}

// TODO: layout > main > nav-bar > nav-left & nav-right needs optimize &&& component > card & modal & spinner & toast needs optimize too.
