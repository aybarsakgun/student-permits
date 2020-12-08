import {Component, Input} from '@angular/core';
import {NavigationItem} from '../../navigation';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../../../ngrx';
import {take} from 'rxjs/operators';
import * as _layoutActions from '../../../../../ngrx/actions/layout.actions';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() item: NavigationItem;

  constructor(
    private store: Store<fromRoot.State>
  ) {
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
    this.store.select(fromRoot.getLayout).pipe(take(1)).subscribe((data) => {
      if (data.mobileNavigationBarCollapsed) {
        this.store.dispatch(new _layoutActions.MobileNavigationBarToggle());
      }
    });
  }
}
