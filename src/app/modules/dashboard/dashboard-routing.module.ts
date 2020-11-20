import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientGuard} from '../../guards/can-activate/client/client.guard';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      ClientGuard
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
