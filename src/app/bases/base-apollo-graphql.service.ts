import {Apollo, gql} from 'apollo-angular';
import {Subscription, Observable} from 'rxjs';

export abstract class BaseApolloGraphQLService {
  protected apolloInstance = 'client';

  constructor(protected apollo: Apollo) {}

  /**
   * @param query (string)
   * @param variables (any)
   * @returns Promise<any>
   */
  protected async Query(query: string, variables: any = null): Promise<any> {
    const queryOptions: any = {query: gql`${ query }`, ...variables && {variables}};
    return new Promise<any>((resolve: (data) => void, reject: (data) => void) => {
      const sub: Subscription = this.apollo.use(this.apolloInstance).watchQuery<any>(queryOptions)
        .valueChanges.subscribe(({data, errors}) => {
          if (sub) {
            sub.unsubscribe();
          }
          if (errors) {
            reject(errors);
          } else {
            resolve(data);
          }
        }, (err: Error) => reject(err));
    });
  }

  /**
   * @param mutation (string)
   * @param variables (any)
   * @returns Promise<any>
   */
  protected async Mutation(mutation: string, variables: any = null): Promise<any> {
    const mutationOptions: any = {mutation: gql`${ mutation }`, ...variables && {variables}};
    return new Promise<any>((resolve: (data) => void, reject: (data) => void) => {
      const sub: Subscription = this.apollo.use(this.apolloInstance).mutate(mutationOptions)
        .subscribe(({data, errors}) => {
          if (sub) {
            sub.unsubscribe();
          }
          if (errors) {
            reject(errors);
          } else {
            resolve(data);
          }
        }, (err: Error) => reject(err));
    });
  }

  /**
   * @param subscription (string)
   * @param variables (any)
   * @returns (Observable<any>)
   */
  protected Subscription(subscription: string, variables: any = null): Observable<any> {
    const subscriptionOptions: any = {query: gql`${ subscription }`, ...variables && {variables}};
    return this.apollo.use(this.apolloInstance).subscribe(subscriptionOptions);
  }
}
