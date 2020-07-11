// angular
import { DeletePopupComponent } from './../../../../shared/components/delete-popup/delete-popup.component';
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
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  // props
  customerListTableDataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = [
    'sn',
    'fname',
    // "lname",
    'mobile',
    'address',
    'registeDate',
    'updateAt',
    'action',
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
    private route: ActivatedRoute
  ) // private toastrService: ToastrService
  // private spinner:NgxspinnerService

  {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customerService.getCustomers().subscribe(
      (data) => {
        // this.toastrService.success('wel-come to customerlist page')

        this.customerListTableDataSource = new MatTableDataSource(data);
        this.customerListTableDataSource.paginator = this.paginator;
        this.customerListTableDataSource.sort = this.sort;
      },
      (error) => {
        console.log('error ma xu ' + error);
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result of first modal ' + result);

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.customerService.dataChange.value.findIndex(
          (x) => x.customerid === this.customerid
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

  addMortgage(customerId: number) {
    const link: any = 'mortgage/add-mortgage/';
    this.router.navigate([link], {
      relativeTo: this.route,
      queryParams: { customerid: customerId },
    });
    // this.toastrService.success('wel-come to create new mortgage page')
  }

  showCustomerDetails(customerId: number) {
    console.log('show data ' + JSON.stringify(customerId));
    // const link: any = '/ganapati/mortgage/'
    this.router.navigate(['/ganapati/mortgage'], {
      queryParams: { customerid: customerId },
    });

    // this.router.navigate(['/ganapati/mortgage/'], {relativeTo: this.route, queryParams: {customerid: customerId}});
  }

  clearField() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.customerListTableDataSource.filter = this.searchKey
      .trim()
      .toLowerCase();
  }

  onDelete(customer) {
    console.log('delete triggered for: ' + JSON.stringify(customer.customerid));

    const dialogRef = this.dialog.open(DeletePopupComponent, {
      data: {},
      disableClose: true,
      /* width: '400px',
      height: '500px', */
    });
    // after modal close
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result of first modal ' + result);

      if (result === 1) {
        const idx = customer.trackerModelDtoList.indexOf(result);
        const sub = this.customerService
          .deleteCustomer(customer.customreid)

          // .pipe(finalize(()=>this.spinner.hide()))
          .subscribe(
            (data) => {
              customer.trackerModelDtoList[idx] = data.result; // or simply data
              // this.toastr.success('Customer successfully deleted.');
              customer.trackerModelDtoList.splice(idx, 1);
              customer.showCancel = false;
              sub.unsubscribe();
            },
            (err) => {
              // this.toastr.error('Error removing customer.');
              sub.unsubscribe();
            }
          );

        // And lastly refresh table
        this.refreshTable();
      }
    });
  }
}
