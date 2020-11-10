import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesComponent} from './components/classes/classes.component';
import {ClientGuard} from '../../guards/can-activate/client/client.guard';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
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
export class ClassRoutingModule {
}
