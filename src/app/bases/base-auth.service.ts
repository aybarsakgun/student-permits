import {Apollo} from 'apollo-angular';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable} from 'rxjs';

import {AppState} from '../ngrx/app-state';
import {BaseApolloGraphQLService} from './base-apollo-graphql.service';
import {ClearCurrentUser} from '../ngrx/actions/current-user.actions';

import {AUTH_STATUS} from '../enums/auth-status.enum';
import {User} from '../interfaces/user.interface';

export abstract class BaseAuthService extends BaseApolloGraphQLService {
  private static status: AUTH_STATUS = AUTH_STATUS.LOADING;
  private static statusBS: BehaviorSubject<AUTH_STATUS> = new BehaviorSubject<AUTH_STATUS>(AUTH_STATUS.LOADING);
  public readonly status$: Observable<AUTH_STATUS> = BaseAuthService.statusBS.asObservable();
  public readonly currentUser$: Observable<User> = this.store.select('currentUser');

  public get token(): string {
    return localStorage.getItem('token');
  }

  public set token(token: string) {
    localStorage.setItem('token', token);
  }

  constructor(protected apollo: Apollo, protected store: Store<AppState>) {
    super(apollo);
    this.init();
  }

  /**
   * @returns void
   */
  public signOut(): void {
    localStorage.clear();
    this.publishStatus(AUTH_STATUS.NOT_LOGGED_IN);
    this.store.dispatch(new ClearCurrentUser(null));
  }

  /**
   * @param status (AUTH_STATUS)
   * @returns void
   */
  protected publishStatus(status: AUTH_STATUS): void {
    if (BaseAuthService.status === status) {
      return;
    }
    BaseAuthService.status = status;
    BaseAuthService.statusBS.next(status);
  }

  /**
   * @returns void
   */
  private init(): void {
    if (this.token) {
      this.publishStatus(AUTH_STATUS.LOGGED_IN);
    } else {
      this.publishStatus(AUTH_STATUS.NOT_LOGGED_IN);
    }
  }
}
