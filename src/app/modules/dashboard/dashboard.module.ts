import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  imports: [
    DashboardRoutingModule,

    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class DashboardModule {
}
