import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
// props
API_URL = environment.apiUrl;
constructor(private http: HttpClient) {}



  changeDetail(detail):any{
    return this.http
    .post(
      `${this.API_URL}/auth/user/changedetail`,
      { ...detail }
    )
    /* .pipe(
      catchError((err) => {
        return Observable.throw(err);
      })
    ); */
  }
}
