import { MortgageDetail } from './../../../core/models/mortgage-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MortgageDetailService {
  // props
  API_URL = environment.apiUrl;
  dialogData: any;
  dataChange: BehaviorSubject<MortgageDetail[]> = new BehaviorSubject<
    MortgageDetail[]
  >([]);
  constructor(private http: HttpClient) {}

  getMortgageDetailPage(id: number): any {}

  getMortgageDetail(id: number): any {
    console.log('passed if' + id);

    return this.http
      .get(`${environment.apiUrl}auth/customer/mortgagedetail?mortgageId=${id}`)
      .pipe(
        retry(2),
        catchError((err) => {
          return throwError(err);
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
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return throwError(err);
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

  getDialogData() {
    return this.dialogData;
  }

  getMortgageDetailEditForm(id: number): any {
    return this.http
      .get(
        `${this.API_URL}auth/customer/mortgagedetail/editform?mortgageDetailId=${id}`
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  saveMortgageDetailEdit(mortgageDetail: MortgageDetail): any {
    console.log('save mortgae detail edit ' + JSON.stringify(mortgageDetail));

    return this.http
      .post(
        `${this.API_URL}auth/customer/mortgagedetail/edit?rate=${mortgageDetail.rate}`,
        { ...mortgageDetail }
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  deleteMortgageDetail(mortgageDetailId) {
    console.log('delete mortgage detail service calling..');
    return this.http
      .delete(`${this.API_URL}auth/customer/mortgagedetail/${mortgageDetailId}`)
      .pipe(
        retry(2),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
