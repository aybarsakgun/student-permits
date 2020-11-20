import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './components/sign-in/sign-in.component';

@NgModule({
  imports: [
    AuthRoutingModule,

    CommonModule,
    SharedModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class AuthModule {
}
