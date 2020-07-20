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
  providedIn: 'root',
})
export class CustomerService {
  // props
  API_URL = environment.apiUrl;
  dialogData: any;
  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(private http: HttpClient) {}

  addCustomer(customer: Customer): any {
    console.log('calling add service');

    return this.http
      .post<Customer>(`${this.API_URL}auth/customer/create`, { ...customer })
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  getCustomers(): any {
    return this.http.get(`${environment.apiUrl}auth/customer`).pipe(
      retry(2),
      catchError((err) => {
        return Observable.throw(err);
      })
    );
  }

  getCustomerById(): any {
    return this.http.get(`${environment.apiUrl}auth/customer`).pipe(
      retry(2),
      catchError((err) => {
        return Observable.throw(err);
      })
    );
  }

  // edit
  updateCustomer(customer: Customer): Observable<any> {
    console.log('customer values ' + JSON.stringify(customer));
    return this.http
      .post(
        // `${environment.apiUrl}auth/customer/editform?customerid=${customer.customerid}`, //edit garne yo part
        `${environment.apiUrl}auth/customer/edit`, //edit garne yo part
        { ...customer }
      )
      .pipe(
        retry(2),
        catchError((err) => {
          return Observable.throw(err);
        })
      );
  }

  getDialogData() {
    return this.dialogData;
  }

  deleteCustomer(customerId): any {
    console.log('delete customer service calling..');
    return this.http.delete(`${this.API_URL}auth/customer/${customerId}`).pipe(
      retry(2),
      catchError((err) => {
        return Observable.throw(err);
      })
    );
  }
}
