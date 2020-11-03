import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from './services/auth/auth.service';
import {PublicGuard} from './guards/can-activate/public/public.guard';
import {ClientGuard} from './guards/can-activate/client/client.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './modules/app-routing.module';
import {NgrxStoreModule} from './modules/ngrx-store.module';
import {SharedModule} from './modules/shared.module';
import {HomeComponent} from './pages/home/home.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgrxStoreModule,
    SharedModule
  ],
  providers: [
    AuthService,
    PublicGuard,
    ClientGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
