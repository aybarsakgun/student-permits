import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {setContext} from 'apollo-link-context';
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloLink, split} from 'apollo-link';

import {GRAPHQL_URL, WS_GRAPHQL_URL} from '../constants/urls';
import {AUTH_STATUS} from '../enums/auth-status.enum';
import {AuthService} from '../services/auth/auth.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpLinkModule
  ],
  exports: [
    HttpLinkModule
  ]
})
export class ApolloAngularModule {
  private authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;

  constructor(apollo: Apollo, httpLink: HttpLink, auth: AuthService) {
    this._createApolloClient(apollo, httpLink, auth);
    auth.status$.subscribe((status: AUTH_STATUS) => {
      if (this.authStatus === status) {
        return;
      }
      this.authStatus = status;
    });
  }

  /**
   * @param apollo (Apollo)
   * @param httpLink (HttpLink)
   * @param auth (AuthService)
   * @returns void
   */
  private _createApolloClient(apollo: Apollo, httpLink: HttpLink, auth: AuthService): void {
    const ws = new WebSocketLink({
      uri: WS_GRAPHQL_URL,
      options: {
        connectionParams: {
          authorization: `Bearer ${auth.token}`
        },
        reconnect: true
      }
    });

    const http = setContext((_, {
      headers
    }) => {
      if (!headers) {
        headers = new HttpHeaders();
      }
      const token: string = auth.token;
      if (token) {
        headers = headers.append('authorization', `Bearer ${token}`);
      }
      return {
        headers
      };
    }).concat(httpLink.create({
      uri: GRAPHQL_URL
    }));

    const link: any = split(({query}) => {
      const res = getMainDefinition(query);
      return res.kind === 'OperationDefinition' && res.operation === 'subscription';
    }, ws, http);

    const cache: any = new InMemoryCache();

    apollo.create({
      link,
      cache
    });
  }
}
