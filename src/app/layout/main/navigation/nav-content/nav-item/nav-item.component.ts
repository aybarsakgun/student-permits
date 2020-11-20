import {Component, Input} from '@angular/core';
import {NavigationItem} from '../../navigation';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() item: NavigationItem;

  constructor() {
  }

  closeOtherMenu(event): void {
    const ele = event.target;
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const upParent = parent.parentElement.parentElement;
      const lastParent = upParent.parentElement;
      const sections = document.querySelectorAll('.pcoded-hasmenu');
      sections.forEach((_, index) => {
        sections[index].classList.remove('active');
        sections[index].classList.remove('pcoded-trigger');
      });
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger');
        parent.classList.add('active');
      } else if (upParent.classList.contains('pcoded-hasmenu')) {
        upParent.classList.add('pcoded-trigger');
        upParent.classList.add('active');
      } else if (lastParent.classList.contains('pcoded-hasmenu')) {
        lastParent.classList.add('pcoded-trigger');
        lastParent.classList.add('active');
      }
    }
    if ((document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
      document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
    }
  }
}
