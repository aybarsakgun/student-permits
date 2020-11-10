import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth/auth.service';
import {PublicGuard} from './guards/can-activate/public/public.guard';
import {ClientGuard} from './guards/can-activate/client/client.guard';
import {AppRoutingModule} from './app-routing.module';
import {NgrxStoreModule} from './modules/ngrx-store.module';
import {SharedModule} from './modules/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloAngularModule} from './modules/apollo-angular.module';
import {NavLeftComponent} from './layout/main/nav-bar/nav-left/nav-left.component';
import {MainComponent} from './layout/main/main.component';
import {NavigationItem} from './layout/main/navigation/navigation';
import {NavGroupComponent} from './layout/main/navigation/nav-content/nav-group/nav-group.component';
import {NavRightComponent} from './layout/main/nav-bar/nav-right/nav-right.component';
import {NavCollapseComponent} from './layout/main/navigation/nav-content/nav-collapse/nav-collapse.component';
import {NavContentComponent} from './layout/main/navigation/nav-content/nav-content.component';
import {NavItemComponent} from './layout/main/navigation/nav-content/nav-item/nav-item.component';
import {NavSearchComponent} from './layout/main/nav-bar/nav-left/nav-search/nav-search.component';
import {ConfigurationComponent} from './layout/main/configuration/configuration.component';
import {NavigationComponent} from './layout/main/navigation/navigation.component';
import {NavBarComponent} from './layout/main/nav-bar/nav-bar.component';
import {AuthComponent} from './layout/auth/auth.component';
import {FriendComponent} from './layout/main/nav-bar/nav-right/chat-user-list/friend/friend.component';
import {ChatMsgComponent} from './layout/main/nav-bar/nav-right/chat-msg/chat-msg.component';
import {ChatUserListComponent} from './layout/main/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


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
    ChatMsgComponent,
    ConfigurationComponent
  ],
  // exports: [
  //   ApolloAngularModule
  // ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ApolloAngularModule,
    NgrxStoreModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule
  ],
  providers: [
    AuthService,
    PublicGuard,
    ClientGuard,
    NavigationItem
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
