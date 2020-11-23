import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {SchoolRoutingModule} from './school-routing.module';
import {SchoolsComponent} from './components/schools/schools.component';
import {SchoolComponent} from './components/school/school.component';

@NgModule({
  imports: [
    SchoolRoutingModule,

    CommonModule,
    SharedModule
  ],
  declarations: [
    SchoolsComponent,
    SchoolComponent
  ]
})
export class SchoolModule {
}
