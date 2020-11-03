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
    this._Init();
  }

  /**
   * @returns void
   */
  public SignOut(): void {
    localStorage.clear();
    this.PublishStatus(AUTH_STATUS.PUBLIC);
    this.store.dispatch(new ClearCurrentUser(null));
  }

  /**
   * @param status (AUTH_STATUS)
   * @returns void
   */
  protected PublishStatus(status: AUTH_STATUS): void {
    if (BaseAuthService.status === status) {
      return;
    }
    BaseAuthService.status = status;
    BaseAuthService.statusBS.next(status);
  }

  /**
   * @returns void
   */
  private _Init(): void {
    if (this.token) {
      this.PublishStatus(AUTH_STATUS.CLIENT);
    } else {
      this.PublishStatus(AUTH_STATUS.PUBLIC);
    }
  }
}
