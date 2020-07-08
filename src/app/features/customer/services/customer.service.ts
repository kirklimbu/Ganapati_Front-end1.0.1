// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// third-party
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
// project
import { Customer } from 'src/app/core/models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // props
  API_URL = environment.apiUrl;
  dialogData:any;
  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  addCustomer(customer: Customer): any {
    return (this.http
      .post<Customer>(
        `${this.API_URL}auth/customer/create`,
        { ...customer },
      )
      .pipe(retry(2),
        catchError(err => {
          return Observable.throw(err)
        })
      ));
  }

  getCustomers(): any {
    return (
      this.http
        .get(`${environment.apiUrl}auth/customer`
        )
        .pipe(retry(2),
          catchError(err => {
            return Observable.throw(err)
          }))
    )
  }

  // edit
  updateCustomer(customer: Customer): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}auth/customer/edit`,
        customer,
        // this.httpOptions
      )
      .pipe(retry(2),
        catchError(err => {
          return Observable.throw(err)
        }));
  }

  getDialogData() {
    return this.dialogData;
  }

}
