import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    // this.userSubject.next(null);
    this.router.navigate(['/login']);

  }

  isAuthenticated(): boolean {

    const token = (localStorage.getItem('token'));

    if (token) {

      return !this.jwtHelper.isTokenExpired(token);
    }
    else return false
  }
}