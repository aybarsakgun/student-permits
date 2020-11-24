import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApolloService} from '../services/apollo/apollo.service';

@Injectable()
export abstract class BaseResolver<T> implements Resolve<T> {
  protected abstract _resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T;

  protected constructor(
    protected service: ApolloService,
    protected router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
    return this._resolve(route, state);
  }
}
