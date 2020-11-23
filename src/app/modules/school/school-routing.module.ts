import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientGuard} from '../../guards/can-activate/client/client.guard';
import {USER_ROLE} from '../../interfaces/user.interface';
import {SchoolsComponent} from './components/schools/schools.component';
import {SchoolComponent} from './components/school/school.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsComponent,
    canActivate: [
      ClientGuard
    ],
    data: {
      accessibleRoles: [USER_ROLE.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: ':id',
    component: SchoolComponent,
    canActivate: [
      ClientGuard
    ],
    data: {
      accessibleRoles: [USER_ROLE.ADMIN, USER_ROLE.SCHOOL_ADMIN]
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {
}
