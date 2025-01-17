import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/core/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss'],
})
export class CustomerformComponent implements OnInit {
  // props
  customerForm: FormGroup;
  customer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.buildCustomerForm();
  }

  buildCustomerForm() {
    this.customerForm = this.formBuilder.group({
      fname: [
        this.customer.fname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      lname: [
        this.customer.lname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      mobile: [
        this.customer.mobile,
        [Validators.required, Validators.pattern('[6-9]\\d{9}')],
      ],
      address: [
        this.customer.address,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onSave() {
    console.log('dfasdf' + JSON.stringify(this.customerForm.value));

    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe(
        (res) => {
          this.toastr.success('New customer added successfully.');
          this.router.navigate(
            ['ganapati/customer']
            //  { relativeTo: this.route } // for dynamic routing
          );
        },
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error('Error adding new customer.');
        }
      );
    }
  }

  // error message block
  getFirstNameErrorMessage() {
    return this.customerForm.controls['fname'].hasError('required')
      ? 'Customer first name is required.'
      : this.customerForm.controls['fname'].hasError('maxLength')
      ? 'Invalid first name.'
      : this.customerForm.controls['fname'].hasError('minLength')
      ? 'First name must be atleast of 2 characters.'
      : '';
  }

  getLastNameErrorMessage() {
    return this.customerForm.controls['lname'].hasError('required')
      ? 'Customer last name is required.'
      : this.customerForm.controls['lname'].hasError('maxLength')
      ? 'Invalid Last name.'
      : this.customerForm.controls['lname'].hasError('minLength')
      ? 'Last name must be atleast of 2 characters.'
      : '';
  }
  getMobileErrorMessage() {
    return this.customerForm.controls['mobile'].hasError('required')
      ? 'Customer mobile number is required.'
      : this.customerForm.controls['mobile'].hasError('pattern')
      ? 'Invalid mobile number.'
      : // this.customerForm.controls['mobile'].hasError('minLength') ? 'Mobile number must be atleast of 10 characters.' :
        '';
  }
  getAddressErrorMessage() {
    return this.customerForm.controls['address'].hasError('required')
      ? 'Customer Address is required.'
      : this.customerForm.controls['address'].hasError('maxLength')
      ? 'Invalid address.'
      : this.customerForm.controls['address'].hasError('minLength')
      ? 'address must be atleast of 2 characters.'
      : '';
  }

  onCancel() {
    this.router.navigate(['/ganapati/customer']);
    // this.location.reload();
  }
}
