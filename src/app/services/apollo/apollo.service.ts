import {Apollo, gql} from 'apollo-angular';
import {Observable, Subscription} from 'rxjs';
import {DocumentNode} from 'graphql';

export abstract class ApolloService {

  protected constructor(
    protected apollo: Apollo
  ) {
  }

  protected async Query(query: DocumentNode, variables: any = null): Promise<any> {
    const queryOptions: any = {query: gql`${ query }`, ...variables && {variables}};
    return new Promise<any>((resolve: (data) => void, reject: (data) => void) => {
      const subscription: Subscription = this.apollo.watchQuery<any>(queryOptions)
        .valueChanges.subscribe(({data, errors}) => {
          if (errors) {
            reject(errors.map(error => error.message).join(', ')); // TODO: GRAPHQL ERRORS
          } else {
            resolve(data);
          }
        }, (error: Error) => { // TODO: NETWORK ERRORS
          reject(error.message);
        }, () => {
          subscription.unsubscribe();
        });
    });
  }

  protected async Mutation(mutation: DocumentNode, variables: any = null): Promise<any> {
    const mutationOptions: any = {mutation: gql`${ mutation }`, ...variables && {variables}};
    return new Promise<any>((resolve: (data) => void, reject: (data) => void) => {
      const subscription: Subscription = this.apollo.mutate(mutationOptions)
        .subscribe(({data, errors}) => {
          if (errors) {
            reject(errors.map(error => error.message).join(', ')); // TODO: GRAPHQL ERRORS
          } else {
            resolve(data);
          }
        }, (error: Error) => { // TODO: NETWORK ERRORS
          reject(error.message);
        }, () => {
          subscription.unsubscribe();
        });
    });
  }

  protected Subscription(subscription: DocumentNode, variables: any = null): Observable<any> {
    const subscriptionOptions: any = {query: gql`${ subscription }`, ...variables && {variables}};
    return this.apollo.subscribe(subscriptionOptions);
  }
}
