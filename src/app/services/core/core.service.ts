import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {gql} from '@apollo/client/core';
import {ApolloService} from '../apollo/apollo.service';
import {Config} from '../../interfaces/config.interface';
import {User} from '../../interfaces/user.interface';
import {BehaviorSubject} from 'rxjs';
import {accessTokenKey} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CoreService extends ApolloService {
  public accessToken: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem(accessTokenKey));

  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  public setAccessToken(token: string): void {
    this.accessToken.next(token);
    return localStorage.setItem(accessTokenKey, token);
  }

  public getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  }

  public removeAccessToken(): void {
    this.accessToken.next(null);
    return localStorage.removeItem(accessTokenKey);
  }

  public async fetchCore(): Promise<{ config: Config, user: User }> {
    const query: DocumentNode = gql`
      query {
        config {
          navigationItems {
            id
            title
            type
            translate
            icon
            hidden
            url
            classes
            exactMatch
            external
            target
            breadcrumbs
            function
            badge {
              title
              type
            }
            children {
              id
              title
              type
              translate
              icon
              hidden
              url
              classes
              exactMatch
              external
              target
              breadcrumbs
              function
              badge {
                title
                type
              }
              children {
                id
                title
                type
                translate
                icon
                hidden
                url
                classes
                exactMatch
                external
                target
                breadcrumbs
                function
                badge {
                  title
                  type
                }
              }
            }
          }
        }
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
      return await this.Query(query);
    } catch (e) {
      throw new Error(e);
    }
  }
}
