import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {appName} from '../../../constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public menuClass = false;
  public windowWidth: number;
  public appName = appName;

  @Output() onNavCollapse = new EventEmitter();
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  private onResize(event: UIEvent): void {
    this.windowWidth = (event.target as Window).innerWidth;
  }

  constructor() {
    this.windowWidth = window.innerWidth;
  }

  navCollapse(): void {
    if (this.windowWidth >= 992) {
      this.onNavCollapse.emit();
    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }
}

// TODO: layout > main > nav-bar > nav-left & nav-right needs optimize &&& component > card & modal & spinner & toast needs optimize too.
