import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApolloAngularModule} from './apollo-angular.module';

import {SpinnerComponent} from '../components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ApolloAngularModule
  ],
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    CommonModule,
    ApolloAngularModule,
    SpinnerComponent,
  ]
})
export class SharedModule {
}
