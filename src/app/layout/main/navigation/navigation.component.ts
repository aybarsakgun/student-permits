import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() onNavMobCollapse = new EventEmitter();

  constructor() {
  }

  navMobCollapse(): void {
    this.onNavMobCollapse.emit();
  }
}
