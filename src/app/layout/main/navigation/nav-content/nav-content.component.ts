import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../../ngrx';
import {Observable} from 'rxjs';
import {NavigationItem} from '../navigation';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {

  public navigationItems$: Observable<NavigationItem[]> = this.store.select(fromRoot.getCoreConfig).pipe(
    map((config) => config && config.navigationItems)
  );

  @Output() onNavMobCollapse = new EventEmitter();

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  navMob(): void {
    if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavMobCollapse.emit();
    }
  }
}
