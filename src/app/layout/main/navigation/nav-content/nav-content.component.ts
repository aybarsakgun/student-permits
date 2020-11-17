import {Component, EventEmitter, Output} from '@angular/core';
import {NavigationItem, NavigationItems} from '../navigation';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent {

  public navigation: NavigationItem[] = NavigationItems;

  @Output() onNavMobCollapse = new EventEmitter();

  constructor() {
  }

  navMob(): void {
    if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavMobCollapse.emit();
    }
  }
}
