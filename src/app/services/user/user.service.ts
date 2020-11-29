import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {gql} from '@apollo/client/core';
import {User} from '../../interfaces/user.interface';
import {ApolloService} from '../apollo/apollo.service';

@Injectable()
export class UserService extends ApolloService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  public async updateUser(user: Partial<User>): Promise<User> {
    const mutation: DocumentNode = gql`
      mutation($user: UserInput!) {
        userUpdate(user: $user) {
          id
          name
          lastName
          email
          phone
          role
          school {
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
      const variables = {user};
      const {userUpdate} = await this.Mutation(mutation, variables);
      return userUpdate as User;
    } catch (e) {
      throw new Error(e);
    }
  }
}
