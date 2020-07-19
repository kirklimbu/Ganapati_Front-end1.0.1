import { MortgageDetail } from './../../../core/models/mortgage-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mortgage } from 'src/app/core/models/mortgage.model';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  // props
  API_URL = environment.apiUrl;
  dialogData: any;
  dataChange: BehaviorSubject<MortgageDetail[]> = new BehaviorSubject<
    MortgageDetail[]
  >([]);

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

  getDialogData() {
    return this.dialogData;
  }

  getMortgageById(mortgageId: number): any {
    return this.http
      .get(
        `${this.API_URL}auth/customer/mortgage/editform?mortgageId=${mortgageId}`
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  saveEditedMortgage(mortgage: Mortgage): any {
    return this.http.post(`${this.API_URL}auth/customer/mortgage/edit`, {
      ...mortgage,
    });
  }
}
