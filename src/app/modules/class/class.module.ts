import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassRoutingModule} from './class-routing.module';
import {SharedModule} from '../shared.module';
import {ClassesComponent} from './components/classes/classes.component';

@NgModule({
  imports: [
    ClassRoutingModule,

    CommonModule,
    SharedModule
  ],
  declarations: [
    ClassesComponent
  ]
})
export class ClassModule {
}
