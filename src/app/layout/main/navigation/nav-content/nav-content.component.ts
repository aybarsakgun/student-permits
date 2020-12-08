import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../../ngrx';
import {Observable} from 'rxjs';
import {NavigationItem} from '../navigation';
import {map, take} from 'rxjs/operators';
import * as _layoutActions from '../../../../ngrx/actions/layout.actions';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {

  public navigationItems$: Observable<NavigationItem[]> = this.store.select(fromRoot.getCoreConfig).pipe(
    map((config) => config && config.navigationItems)
  );

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  toggleMobileNavigationBar(): void {
    this.store.select(fromRoot.getLayout).pipe(take(1)).subscribe((data) => {
      if (data.mobileNavigationBarCollapsed) {
        this.store.dispatch(new _layoutActions.MobileNavigationBarToggle());
      }
    });
  }
}
