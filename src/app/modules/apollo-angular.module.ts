import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {setContext} from 'apollo-link-context';
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloLink, split} from 'apollo-link';
import {accessTokenKey, GRAPHQL_URL, WS_GRAPHQL_URL} from '../constants';
import {Store} from '@ngrx/store';
import * as fromRoot from '../ngrx/index';
import {filter, take} from 'rxjs/operators';

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
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private store: Store<fromRoot.State>
  ) {
    this.createApolloClient();
    this.store.select(fromRoot.getAuthUser).pipe(
      filter(user => !!(user && user.accessToken)),
      take(1)
    ).subscribe(user => {
      localStorage.setItem(accessTokenKey, user.accessToken);
      const apolloClient = this.apollo.default().client;
      if (apolloClient) {
        apolloClient.setLink(this.createApolloLink() as any);
      }
    });
  }

  private createApolloClient(): void {
    const cache: any = new InMemoryCache();
    this.apollo.create({
      link: this.createApolloLink() as any,
      cache
    });
  }

  private createApolloLink(): ApolloLink {
    const accessToken: string = localStorage.getItem(accessTokenKey);
    const ws = new WebSocketLink({
      uri: WS_GRAPHQL_URL,
      options: {
        connectionParams: {
          authorization: `Bearer ${accessToken}`
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
      if (accessToken) {
        headers = headers.append('authorization', `Bearer ${accessToken}`);
      }
      return {
        headers
      };
    }).concat(this.httpLink.create({
      uri: GRAPHQL_URL
    }));

    return split(({query}) => {
      const res = getMainDefinition(query);
      return res.kind === 'OperationDefinition' && res.operation === 'subscription';
    }, ws, http);
  }
}
