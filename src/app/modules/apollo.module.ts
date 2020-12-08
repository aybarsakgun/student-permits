import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloLink, split} from 'apollo-link';
import {GRAPHQL_URL, WS_GRAPHQL_URL} from '../constants';
import {onError} from '@apollo/client/link/error';
import {CoreService} from '../services/core/core.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpLinkModule
  ],
  exports: [
    HttpLinkModule
  ]
})
export class ApolloModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private coreService: CoreService
  ) {
    this.createApolloClient();
  }

  private createApolloClient(): void {
    const cache: any = new InMemoryCache();
    this.apollo.create({
      link: this.createApolloLink() as any,
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        }
      },
    });
  }

  private createApolloLink(): ApolloLink {
    const httpLink = this.httpLink.create({
      uri: GRAPHQL_URL
    });

    const wsLink = new WebSocketLink({
      uri: WS_GRAPHQL_URL,
      options: {
        connectionParams: {
          authorization: `Bearer ${this.coreService.accessToken.value}`
        },
        reconnect: true
      }
    });

    const terminatingLink = split(
      ({query}) => {
        const def = getMainDefinition(query);
        return def.kind === 'OperationDefinition' && def.operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({headers = new HttpHeaders(), accessToken = this.coreService.accessToken.value}: any) => {
        if (accessToken) {
          headers = headers.append('authorization', `Bearer ${accessToken}`);
        }
        return {
          headers
        };
      });
      return forward(operation);
    });

    const errorLink = onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          const errorMessage: string = error.message;
          console.warn(`graphqlError: ${errorMessage}`);
        });
      }
      if (networkError) {
        console.warn('networkError: ', networkError);
        if (networkError['error'].errors && networkError['error'].errors.length) {
          networkError.message = networkError['error'].errors.map(error => (error.message));
        }
      }
    });

    return ApolloLink.from([errorLink as any, authLink, terminatingLink]);
  }
}
