import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {currentUser} from '../ngrx/reducers/current-user.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      currentUser,
    })
  ]
})
export class NgrxStoreModule {
}
