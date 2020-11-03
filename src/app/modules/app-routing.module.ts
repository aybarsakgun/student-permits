import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PublicGuard} from '../guards/can-activate/public/public.guard';
import {ClientGuard} from '../guards/can-activate/client/client.guard';

import {HomeComponent} from '../pages/home/home.component';
import {SignInComponent} from '../pages/sign-in/sign-in.component';
import {PageNotFoundComponent} from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [ClientGuard]},
  {path: 'sign-in', component: SignInComponent, canActivate: [PublicGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
