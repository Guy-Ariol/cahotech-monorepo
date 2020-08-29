import { Injectable } from '@angular/core';
import { UserService } from "libs/service/src/lib/user/user.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  /**
  *Creates an instance of GuardService.
  * @memberof GuardService
  */
  constructor(
    private userLib: UserService
  ) { }

  /** check if route can be activated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof GuardService
   */
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let out = false

    if (route.routeConfig.path == 'admin') out = true
    else out = (this.userLib.currentUser && this.userLib.currentWorker) ? true : false

    return out
  }
}
