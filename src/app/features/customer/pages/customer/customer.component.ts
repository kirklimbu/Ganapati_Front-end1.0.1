import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Customer } from 'src/app/core/models/customer.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../../services/customer.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EditcustomerComponent } from '../editcustomer/editcustomer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  // props
  customerListTableDataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = [
    "sn",
    "fname",
    "lname",
    "mobile",
    "address",
    "registeDate",
    "updateAt",
    "action"
  ];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  private customerid: number;
  searchKey: string;

  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    // private toastrService: ToastrService
  ) { }

  ngOnInit() {

    this.fetchCustomers();
  }


  fetchCustomers() {

    this.customerService.getCustomers()
      .subscribe(
        data => {
          // this.toastrService.success('wel-come to customerlist page')

          this.customerListTableDataSource = new MatTableDataSource(data);
          this.customerListTableDataSource.paginator = this.paginator;
          this.customerListTableDataSource.sort = this.sort;
        },
        error => {
          console.log("error ma xu " + error);
        }
      );
  }

  onEdit(
    customerid: number,
    fname: string,
    lname: string,
    address: string,
    mobile: string,
    registerAt: Date
  ) {

    console.log('inside edit modal' + customerid + fname);

    const dialogRef = this.dialog.open(EditcustomerComponent, {
      data: { customerid, fname, lname, address, mobile, registerAt },
      disableClose: true,
      width: '400px',
      height: '500px',

    });

    dialogRef.afterClosed()
      .subscribe(result => {

        console.log('result of first modal ' + (result));

        if (result === 1) {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.customerService.dataChange.value.findIndex(
            x => x.customerid === this.customerid
          );
          // Then you update that record using data from dialogData (values you enetered)
          this.customerService.dataChange.value[
            foundIndex
          ] = this.customerService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
        }
      });
  }

  private refreshTable() {
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addMortgage(customerid: number) {
    this.router.navigate(["/mortgage/createmortgage", customerid]);
    // this.toastrService.success('wel-come to create new mortgage page')
  }

  showCustomerDetails(customerid: number) {
    // this.router.navigate(["customer-detail", customerid],{relativeTo: this.route});
    this.router.navigate(["/customer/customer-detail", customerid]); //static routing

  }

  clearField() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.customerListTableDataSource.filter = this.searchKey
      .trim()
      .toLowerCase();
  }

  onDelete() { }


}
