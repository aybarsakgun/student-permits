import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Apollo} from 'apollo-angular';

import {BaseAuthService} from '../../bases/base-auth.service';
import {AppState} from '../../ngrx/app-state';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseAuthService {
  constructor(protected apollo: Apollo, protected store: Store<AppState>) {
    super(apollo, store);
  }

  // /**
  //  * @param email (string) to can sign in.
  //  * @param password (string) to can sign in.
  //  * @returns Promise<void>
  //  */
  // public async SignIn(email: string, password: string): Promise<void> {
  //   const query = `query ($email: String!, $password: String!)
  // 		{ signIn(email: $email, password: $password) }`;
  //   const variables: any = {email, password};
  //   const {signIn} = await this.Query(query, variables);
  //   this.token = signIn;
  //   this.PublishStatus(AUTH_STATUS.CLIENT);
  // }
  //
  // /**
  //  * @param user (User)
  //  * @param password (string)
  //  * @returns Promise<void>
  //  */
  // public async SignUp(user: User, password: string): Promise<void> {
  //   const mutation = `mutation ($user: UserInput!, $password: String!)
  // 		{ signUp(user: $user, password: $password) }`;
  //   const variables: any = {user, password};
  //   await this.Mutation(mutation, variables);
  // }
}
