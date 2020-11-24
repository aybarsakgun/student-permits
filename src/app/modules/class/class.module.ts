import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassRoutingModule} from './class-routing.module';
import {SharedModule} from '../shared.module';
import {ClassesComponent} from './components/classes/classes.component';
import {ClassResolver} from './resolvers/class.resolver';
import {ClassService} from './services/class.service';
import {ClassComponent} from './components/class/class.component';

@NgModule({
  imports: [
    ClassRoutingModule,

    CommonModule,
    SharedModule
  ],
  declarations: [
    ClassesComponent,
    ClassComponent
  ],
  providers: [
    ClassResolver,
    ClassService
  ]
})
export class ClassModule {
}
