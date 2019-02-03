import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth)
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth)
  }
}
