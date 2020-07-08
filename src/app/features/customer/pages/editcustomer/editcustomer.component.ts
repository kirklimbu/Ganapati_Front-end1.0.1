import { FormGroup, FormBuilder } from '@angular/forms';
// angular
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


// third-party

import { BehaviorSubject, Observable } from 'rxjs';
// import { error } from 'util';
import { EventEmitter } from 'protractor';
// project
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.scss']
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

  ) { }



  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.editCustomerForm = this.fb.group({
      fname: [this.customer.fname, Validators.required],
      lname: [this.customer.lname, Validators.required],
      mobile: [this.customer.mobile, Validators.required],
      address: [this.customer.address, Validators.required]
    });
  }


  hasError(name: string, required: string) { }


  onSave() {

    return this.customerService.updateCustomer(this.editCustomerForm.value)
      .subscribe(data => {
        this.dialogData = data;
        this.refreshTable();

        // location.reload(true); // yesko sato table matra refresh garne banaunu perxa

        // this.route.navigate(['customerlist']);
        // this.('Successfully edited', 3000);
      },
        (err: HttpErrorResponse) => {
          this.err_msg = err;
        }
      );


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
