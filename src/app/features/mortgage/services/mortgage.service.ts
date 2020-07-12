import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  // props
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addMortgage(id: number, mortgage: any): any {
    console.log(
      'calling add mortgage service' + id + ' ' + JSON.stringify(mortgage)
    );
    return this.http
      .post(`${this.API_URL}auth/customer/mortgage/create?customerId=${id}`, {
        ...mortgage,
      })
      .pipe(
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  getMortgageList(id): any {
    console.log('calling mortgage detail' + id);

    return this.http
      .get(`${this.API_URL}auth/customer/mortgage?customerId=${id}`)
      .pipe(
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  
}
