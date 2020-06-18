import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // backend api
  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLogin(username, password):any {
    console.log('calling login service'+ username,password);

    return this.http.post(`${this.API_URL}/user/login`, { username, password })
      .pipe(
        catchError(error => {
          return Observable.throw(error);
        })
      )
  }
}
