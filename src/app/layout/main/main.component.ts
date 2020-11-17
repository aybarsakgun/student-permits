import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public navCollapsed = false;
  public navCollapsedMob = false;

  constructor() {
  }

}
