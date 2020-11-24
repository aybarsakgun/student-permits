import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {gql} from '@apollo/client/core';
import {ApolloService} from '../../../services/apollo/apollo.service';
import {Class as IClass} from '../../../interfaces/class.interface';
import {Observable, of} from 'rxjs';

@Injectable()
export class ClassService extends ApolloService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  public async fetchClass(id: string): Promise<IClass> {
    const query: DocumentNode = gql`
      query($id: ID!) {
        Class(id: $id) {
          id
          name
          school {
            id
            name
            createdAt
            updatedAt
          }
          teachers {
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
          students {
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
          createdAt
          updatedAt
        }
      }
    `;
    try {
      const variables = {id};
      const {Class} = await this.Query(query, variables);
      return Class as IClass;
    } catch (e) {
      throw new Error(e);
    }
  }
}
