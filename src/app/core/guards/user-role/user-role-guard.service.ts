import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuardService implements CanActivate {

  // props
  currentUser: User = new User();

  constructor(
    // private UserDetailService: UserDetailService,
    private router: Router,

  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if ((next.data.allowedRoles.includes(this.currentUser.role)) || (next.data.allowedRoles.includes('ALL'))) {
      return true;
    } else {
      this.router.navigate(['404']);
    }
  }
}
