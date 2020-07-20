import { ToastrService } from 'ngx-toastr';
import { EditMortgageDetailComponent } from './../edit-mortgage-detail/edit-mortgage-detail.component';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MortgageDetailService } from '../../services/mortgage-detail.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Customer } from 'src/app/core/models/customer.model';
import { MortgageService } from 'src/app/features/mortgage/services/mortgage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/features/customer/services/customer.service';
import { DeletePopupComponent } from 'src/app/shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.scss'],
})
export class MortgageDetailComponent implements OnInit {
  // props
  // public mortgageDetails: Observable<MortgageDetailsCollection>;
  customers: Customer = new Customer();
  private customerId: number;
  private mortgageId: number;
  private mortgageDetailId: number;
  interest: number;
  // test table
  mortgages: any;
  mortgageDetails: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'sn',
    'date',
    'status',
    'days',
    'amount',
    'action',
  ];
  // test variables
  fakeMortId: any;
  amount: any;
  valuation: any;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  private mortDetId: number;
  constructor(
    private mortgageDetailsService: MortgageDetailService,
    private mortgageService: MortgageService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchCustomerDetail();
    this.fetchMortgageDetails();
    this.fetchMortgage();
  }

  // similar to getCustomerById
  fetchCustomerDetail() {
    console.log('insede fetcch customer detail block');

    this.customerService.getCustomerById().subscribe((res) => {
      this.customers = res.filter((f) => f.customerid === this.customerId);
      // console.log('filter customer data ' + JSON.stringify(this.customer));
    });
  }

  fetchMortgage() {
    console.log('insede fetcch mortgage block');

    // get customerId from URL
    this.route.queryParams.subscribe((params) => {
      this.customerId = +params.customerid;
    });
    this.mortgageService.getMortgageList(this.customerId).subscribe((data) => {
      this.mortgages = data.filter((m) => m.mortgageId === this.mortgageId);
      console.log('filtered mortgage data ' + JSON.stringify(this.mortgages));
    });
  }

  fetchMortgageDetails() {
    console.log('insede fetcch mortgage detail block');

    this.route.queryParams.subscribe((params) => {
      this.mortgageId = +params.mortgageId;
    });
    this.mortgageDetailsService.getMortgageDetail(this.mortgageId).subscribe(
      (data) => {
        this.interest = data.interestList[0].amount;
        this.mortgageDetails = data.mortgageDetailList;
      },
      (err) => {
        err = err.error.message
        ? this.toastr.error(err.error.message)
        : this.toastr.error('Error fetching mortgage details.');      }
    );
  }

  // back navigation
  goToList() {
    this.router.navigate(['/mortgage-detail']);
  }

  // add mortgage detail
  onAdd() {
    this.router.navigate(['/ganapati/interest/add-interest'], {
      queryParams: {
        mortgageId: this.mortgageId,
      },
    });
  }

  // edit
  onEdit(mortDetId: number, amount: number, status: string, rate?: number) {
    console.log('mortgagedetail ' + this.mortgageId + amount);
    const dialogRef = this.dialog.open(EditMortgageDetailComponent, {
      data: {
        mortDetId,
        amount,
        status,
      },
      // disableClose: true,
      width: '400px',
      height: '500px',
    });

    // after modal close
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.mortgageService.dataChange.value.findIndex(
          (x) => x.mortDetId === this.mortDetId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.mortgageService.dataChange.value[
          foundIndex
        ] = this.mortgageService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  onDelete(mortgageDetail) {
    console.log('delete triggered for: ' + JSON.stringify(mortgageDetail));

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
        const idx = mortgageDetail.trackerModelDtoList.indexOf(result);
        const sub = this.mortgageDetailsService
          .deleteMortgageDetail(mortgageDetail.mortDetId)

          // .pipe(finalize(()=>this.spinner.hide()))
          .subscribe(
            (data) => {
              mortgageDetail.trackerModelDtoList[idx] = data; // or simply data
              this.toastr.success('Mortgage detail successfully deleted.');
              mortgageDetail.trackerModelDtoList.splice(idx, 1);
              mortgageDetail.showCancel = false;
              sub.unsubscribe();
            },
            (err) => {
              this.toastr.error('Error removing mortgage detail.');
              sub.unsubscribe();
            }
          );

        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
