import { TestModalComponent } from './../../../../shared/components/test-modal/test-modal.component';
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

  // test props
  animal: string;
  name: string;


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
      fname: [this.data.fname, Validators.required],
      lname: [this.data.lname, Validators.required],
      mobile: [this.data.mobile, Validators.required],
      address: [this.data.address, Validators.required]
    });
  }

  onSave() {

    // test modal
    const dialogRef = this.dialog.open(TestModalComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + JSON.stringify(result));

      if (result === 1) {
        console.log('Yes cliceked');

      } else {
        console.log('No cliceked');

      }
    });
  }
  // end test modal

  /* return this.customerService.updateCustomer(this.editCustomerForm.value)
    .subscribe(data => {
      console.log('customer update response '+ data);
      
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
 

}  */


  // error message block
  getFirstNameErrorMessage() {
    return this.editCustomerForm.controls['fname'].hasError('required') ? 'Customer first name is required.' :
      this.editCustomerForm.controls['fname'].hasError('maxLength') ? 'Invalid first name.' :
        this.editCustomerForm.controls['fname'].hasError('minlength') ? 'First name must be atleast of 2 characters.' :
          '';
  }

  getLastNameErrorMessage() {
    return this.editCustomerForm.controls['lname'].hasError('required') ? 'Customer last name is required.' :
      this.editCustomerForm.controls['lname'].hasError('maxLength') ? 'Invalid Last name.' :
        this.editCustomerForm.controls['lname'].hasError('minlength') ? 'Last name must be atleast of 2 characters.' :
          '';
  }
  getMobileErrorMessage() {
    return this.editCustomerForm.controls['mobile'].hasError('required') ? 'Customer mobile number is required.' :
      this.editCustomerForm.controls['mobile'].hasError('pattern') ? 'Invalid mobile number.' :
        // this.editCustomerForm.controls['mobile'].hasError('minlength') ? 'Mobile number must be atleast of 10 characters.' :
        '';
  }
  getAddressErrorMessage() {
    return this.editCustomerForm.controls['address'].hasError('required') ? 'Customer Address is required.' :
      this.editCustomerForm.controls['address'].hasError('maxLength') ? 'Invalid address.' :
        this.editCustomerForm.controls['address'].hasError('minlength') ? 'address must be atleast of 2 characters.' :
          '';
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
