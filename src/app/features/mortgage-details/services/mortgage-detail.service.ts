import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    console.log('passed if' + id);

    return this.http
      .get(`${environment.apiUrl}auth/customer/mortgagedetail?mortgageId=${id}`)
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  createNewMortgageDetail(mortgageId: number, rate: number, body): any {
    console.log(' paramVal= ' + mortgageId, body);
    const params = new HttpParams()
      .set('mortgageId', String(mortgageId))
      .set('rate', String(body.rate));

    console.log('inside params ');
    // this.params2 = parseFloat(params);
    return this.http
      .post(
        `${this.API_URL}auth/customer/mortgagedetail/create?mortgageId=${mortgageId}&rate=${body.rate}`,
        { ...body }
        // this.httpOptions
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );

    // new code
    /* console.log(
      'calling create mortggae detail servive ' +
        mortgageId +
        rate +
        JSON.stringify(body)
    );

    return this.http
      .post(
        `${this.API_URL}auth/customer/mortgagedetail/create?mortgageId=${mortgageId}?rate=${rate}`,
        { ...body }
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      ); */
  }
}
