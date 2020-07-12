import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MortgageDetailService {
  // props
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMortgageDetailPage(id: number): any {}

  getMortgageDetail(id: number): any {
    return this.http
      .post(
        `${environment.apiUrl}/auth/customer/mortgagedetail?mortgageId=`,
        id
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  createNewMortgageDetail(
    mortgageId: number,
    rate: number,
    body
  ): Observable<any> {
    console.log(' paramVal= ' + mortgageId, body);
    const params = new HttpParams()
      .set('mortgageId', String(mortgageId))
      .set('rate', String(body.rate));

    console.log('inside params ' + params);
    // this.params2 = parseFloat(params);
    return this.http
      .post(
        `${environment.apiUrl}/auth/customer/mortgagedetail/create/` +
          mortgageId +
          '/' +
          body.rate,
        body
        // this.httpOptions
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }
}
