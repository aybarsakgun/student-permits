import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NavigationItem} from '../../navigation';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)', display: 'block'}),
        animate('250ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ],
})
export class NavCollapseComponent {
  @Input() item: NavigationItem;

  constructor() {
  }

  navCollapse(event): void {
    let parent = event.target;
    parent = parent.parentElement;
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    sections.forEach((_, index) => {
      if (sections[index] !== parent) {
        sections[index].classList.remove('pcoded-trigger');
      }
    });
    let firstParent = parent.parentElement;
    let preParent = parent.parentElement.parentElement;
    if (firstParent.classList.contains('pcoded-hasmenu')) {
      do {
        firstParent.classList.add('pcoded-trigger');
        firstParent = firstParent.parentElement.parentElement.parentElement;
      } while (firstParent.classList.contains('pcoded-hasmenu'));
    } else if (preParent.classList.contains('pcoded-submenu')) {
      do {
        preParent.parentElement.classList.add('pcoded-trigger');
        preParent = preParent.parentElement.parentElement.parentElement;
      } while (preParent.classList.contains('pcoded-submenu'));
    }
    parent.classList.toggle('pcoded-trigger');
  }
}
