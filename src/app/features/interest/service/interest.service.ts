import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Interest } from 'src/app/core/models/interest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  // props
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  saveInterest(mortgageId: number, interest: Interest): any {
    console.log(
      'calling save interest service ' +
        `${mortgageId}` +
        JSON.stringify(interest)
    );

    return this.http
      .post(
        `${this.API_URL}auth/customer/mortgage/interestreceive?mortgageId=${mortgageId}`,
        { ...interest }
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  getTotalInterest(mortgageId: number): any {
    return this.http
      .get(
        `${this.API_URL}auth/customer/mortgage/totalinterest?mortgageId=${mortgageId}`
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }
}
