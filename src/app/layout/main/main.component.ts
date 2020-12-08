import {Component, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../ngrx';
import * as fromLayout from '../../ngrx/reducers/layout.reducers';
import * as _layoutActions from '../../ngrx/actions/layout.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public layoutStates$: Observable<fromLayout.State> = this.store.select(fromRoot.getLayout);

  @HostListener('window:resize', ['$event'])
  private onResize(event: UIEvent): void {
    if ((event.target as Window).innerWidth <= 992) {
      this.store.dispatch(new _layoutActions.NavigationBarToggle(false));
    } else {
      this.store.dispatch(new _layoutActions.MobileNavigationBarToggle(false));
    }
  }

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

}
