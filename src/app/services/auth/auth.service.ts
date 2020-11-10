import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Apollo} from 'apollo-angular';

import {BaseAuthService} from './base-auth.service';
import {AppState} from '../../ngrx/app-state';
import {AUTH_STATUS} from '../../enums/auth-status.enum';
import {User} from '../../interfaces/user.interface';
import gql from 'graphql-tag';
import {SetCurrentUser} from '../../ngrx/actions/current-user.actions';
import {DocumentNode} from 'graphql';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../../environments/environment';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseAuthService {
  constructor(
    protected apollo: Apollo,
    protected store: Store<AppState>,
    private http: HttpClient
  ) {
    super(apollo, store);
  }

  /*
   * @param token (string)
   * @returns void
   */
  public async verifyToken(token: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post(`${BASE_URL}/auth/verify`, {
        token
      }).pipe(
        first()
      ).subscribe((result: boolean) => {
        if (result) {
          this.token = token;
          this.publishStatus(AUTH_STATUS.LOGGED_IN);
          resolve(true);
        } else {
          localStorage.clear();
          this.publishStatus(AUTH_STATUS.NOT_LOGGED_IN);
          resolve(false);
        }
      });
    });
  }

  /*
   * @returns Promise<User>
   */
  public async fetchUser(): Promise<User> {
    const query: DocumentNode = gql`
      query {
        user{
          id
          name
          lastName
          email
          phone
          role
          school{
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    `;
    const {user} = await this.Query(query);
    const currentUser: User = user;
    this.store.dispatch(new SetCurrentUser(currentUser));
    return currentUser;
  }
}
