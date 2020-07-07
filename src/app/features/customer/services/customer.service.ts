// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// third-party
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
// project
import { Customer } from 'src/app/core/models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // props
  API_URL = environment.apiUrl;
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
}
