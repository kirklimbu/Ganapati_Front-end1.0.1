import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { catchError, first, map } from 'rxjs/operators';
// project
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // backend api
  API_URL = environment.apiUrl;

  //props
  error: any;
  loading = false;
  constructor(
    private http: HttpClient,
  ) { }

  getLogin(username, password): any {
    console.log('calling login service ' + username, password);

    return this.http
      .post<User>(`${this.API_URL}user/login`, { username, password })
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', res.token);
      }))
  }
}
