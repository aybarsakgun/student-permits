import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Apollo} from 'apollo-angular';
import {User, USER_ROLE} from '../../interfaces/user.interface';
import {DocumentNode} from 'graphql';
import {filter, map, take, withLatestFrom} from 'rxjs/operators';
import {ApolloService} from '../apollo/apollo.service';
import * as fromRoot from '../../ngrx/index';
import * as _authActions from '../../ngrx/actions/auth.actions';
import {Observable} from 'rxjs';
import {accessTokenKey} from '../../constants';
import {gql} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApolloService {
  constructor(
    protected apollo: Apollo,
    private store: Store<fromRoot.State>
  ) {
    super(apollo);
  }

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
    try {
      const {user} = await this.Query(query);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  public signOut(): void {
    localStorage.removeItem(accessTokenKey);
    this.store.dispatch(new _authActions.CurrentUser(null));
  }

  private get getAuth(): Observable<[boolean, User]> {
    return this.store.select(fromRoot.getAuthUserLoading).pipe(
      filter(loading => !loading),
      withLatestFrom(this.store.select(fromRoot.getAuthUser)),
      take(1),
    );
  }

  public get isLoggedIn(): Observable<boolean> {
    return this.getAuth.pipe(
      map(([_, user]: [boolean, User]) => !!(user && user.email))
    );
  }

  public get isAdmin(): Observable<boolean> {
    return this.getAuth.pipe(
      map(([_, user]: [boolean, User]) => !!(user && user.role === USER_ROLE.ADMIN))
    );
  }

  public get isSchoolAdmin(): Observable<boolean> {
    return this.getAuth.pipe(
      map(([_, user]: [boolean, User]) => !!(user && user.role === USER_ROLE.SCHOOL_ADMIN))
    );
  }

  public get isTeacher(): Observable<boolean> {
    return this.getAuth.pipe(
      map(([_, user]: [boolean, User]) => !!(user && user.role === USER_ROLE.TEACHER))
    );
  }

  public get isStudent(): Observable<boolean> {
    return this.getAuth.pipe(
      map(([_, user]: [boolean, User]) => !!(user && user.role === USER_ROLE.STUDENT))
    );
  }
}
