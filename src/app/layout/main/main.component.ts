import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public navCollapsed = false;
  public navCollapsedMob = false;

  @HostListener('window:resize', ['$event'])
  private onResize(event: UIEvent): void {
    if ((event.target as Window).innerWidth <= 992) {
      this.navCollapsed = false;
    }
  }

  constructor() {
  }

}
