import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassesComponent} from './components/classes/classes.component';
import {ClientGuard} from '../../guards/can-activate/client/client.guard';
import {ClassResolver} from './resolvers/class.resolver';
import {ClassComponent} from './components/class/class.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    canActivate: [
      ClientGuard
    ],
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: ClassComponent,
    canActivate: [
      ClientGuard
    ],
    resolve: {
      response: ClassResolver
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule {
}
