import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth/auth.service';
import {PublicGuard} from './guards/can-activate/public/public.guard';
import {ClientGuard} from './guards/can-activate/client/client.guard';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './modules/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloModule} from './modules/apollo.module';
import {NavLeftComponent} from './layout/main/nav-bar/nav-left/nav-left.component';
import {MainComponent} from './layout/main/main.component';
import {NavGroupComponent} from './layout/main/navigation/nav-content/nav-group/nav-group.component';
import {NavRightComponent} from './layout/main/nav-bar/nav-right/nav-right.component';
import {NavCollapseComponent} from './layout/main/navigation/nav-content/nav-collapse/nav-collapse.component';
import {NavContentComponent} from './layout/main/navigation/nav-content/nav-content.component';
import {NavItemComponent} from './layout/main/navigation/nav-content/nav-item/nav-item.component';
import {NavSearchComponent} from './layout/main/nav-bar/nav-left/nav-search/nav-search.component';
import {NavigationComponent} from './layout/main/navigation/navigation.component';
import {NavBarComponent} from './layout/main/nav-bar/nav-bar.component';
import {AuthComponent} from './layout/auth/auth.component';
import {FriendComponent} from './layout/main/nav-bar/nav-right/chat-user-list/friend/friend.component';
import {ChatMsgComponent} from './layout/main/nav-bar/nav-right/chat-msg/chat-msg.component';
import {ChatUserListComponent} from './layout/main/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './ngrx';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './ngrx/effects/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ConfigService} from './services/core/config/config.service';
import {CoreEffects} from './ngrx/effects/core.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    NotFoundComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ChatUserListComponent,
    FriendComponent,
    ChatMsgComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ApolloModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, CoreEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule
  ],
  providers: [
    AuthService,
    PublicGuard,
    ClientGuard,
    ConfigService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
