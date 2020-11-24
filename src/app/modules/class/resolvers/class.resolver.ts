import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Class} from '../../../interfaces/class.interface';
import {ClassService} from '../services/class.service';
import {BaseResolver} from '../../../resolvers/base.resolver';

@Injectable()
export class ClassResolver extends BaseResolver<Promise<Class>> {
  constructor(
    protected service: ClassService,
    protected router: Router
  ) {
    super(service, router);
  }

  async _resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Class> {
    return await this.service.fetchClass(route.params.id);
  }
}
