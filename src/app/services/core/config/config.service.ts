import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {gql} from '@apollo/client/core';
import {ApolloService} from '../../apollo/apollo.service';
import {Config} from '../../../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends ApolloService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  public async fetchConfig(): Promise<Config> {
    const query: DocumentNode = gql`
      query {
        config {
          navigation {
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
      }
    `;
    try {
      const {config} = await this.Query(query);
      return config;
    } catch (e) {
      throw new Error(e);
    }
  }
}
