// angular
import { Component, Inject, OnInit, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// third-party
import { BehaviorSubject } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
// project
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.scss'],
})
export class EditcustomerComponent implements OnInit {
  // props
  editCustomerForm: FormGroup;
  customer: Customer = new Customer();

  private dialogData: any;
  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  private err_msg: HttpErrorResponse;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<EditcustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerService: CustomerService,
    public route: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.editCustomerForm = this.fb.group({
      fname: [
        this.data.fname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      lname: [
        this.data.lname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      mobile: [
        this.data.mobile,
        [Validators.required, Validators.pattern('[6-9]\\d{9}')],
      ],
      address: [
        this.data.address,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onSave() {
    return this.customerService
      .updateCustomer(this.editCustomerForm.value)
      .subscribe(
        (data) => {
          this.dialogData = data;
          this.refreshTable();
        },
        (err: HttpErrorResponse) => {
          this.err_msg = err;
        }
      );
  }

  // error message block
  getFirstNameErrorMessage() {
    return this.editCustomerForm.controls['fname'].hasError('required')
      ? 'Customer first name is required.'
      : this.editCustomerForm.controls['fname'].hasError('maxLength')
      ? 'Invalid first name.'
      : this.editCustomerForm.controls['fname'].hasError('minlength')
      ? 'First name must be atleast of 2 characters.'
      : '';
  }

  getLastNameErrorMessage() {
    return this.editCustomerForm.controls['lname'].hasError('required')
      ? 'Customer last name is required.'
      : this.editCustomerForm.controls['lname'].hasError('maxLength')
      ? 'Invalid Last name.'
      : this.editCustomerForm.controls['lname'].hasError('minlength')
      ? 'Last name must be atleast of 2 characters.'
      : '';
  }
  getMobileErrorMessage() {
    return this.editCustomerForm.controls['mobile'].hasError('required')
      ? 'Customer mobile number is required.'
      : this.editCustomerForm.controls['mobile'].hasError('pattern')
      ? 'Invalid mobile number.'
      : // this.editCustomerForm.controls['mobile'].hasError('minlength') ? 'Mobile number must be atleast of 10 characters.' :
        '';
  }
  getAddressErrorMessage() {
    return this.editCustomerForm.controls['address'].hasError('required')
      ? 'Customer Address is required.'
      : this.editCustomerForm.controls['address'].hasError('maxLength')
      ? 'Invalid address.'
      : this.editCustomerForm.controls['address'].hasError('minlength')
      ? 'address must be atleast of 2 characters.'
      : '';
  }
  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
