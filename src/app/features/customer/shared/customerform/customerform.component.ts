import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']
})
export class CustomerformComponent implements OnInit {

  // props
  public customerForm: FormGroup;
  customer: Customer = new Customer();

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastrService: ToastrService
  ) { }

  ngOnInit() {

    this.buildCustomerForm();
  }

  buildCustomerForm() {
    this.customerForm = this.formBuilder.group({
      fname: [this.customer.fname, Validators.required],
      lname: [this.customer.lname, Validators.required],
      mobile: [this.customer.mobile, Validators.required],
      address: [this.customer.address, Validators.required]
    });
  }

  createCustomer() {
    console.log("dfasdf" + JSON.stringify(this.customerForm.value));

    this.customerService.addCustomer(this.customerForm.value)
      .subscribe(
        res => {
          console.log('customer add res ' + res);
          this.router.navigate(['customerlist'])
        }, err => {
          console.log('error in customer add');

        }
      )

  }

  hasError(name: string, required: string) { }

  public onCancel = () => {
    return null;
    // this.location.reload();
  };
}
