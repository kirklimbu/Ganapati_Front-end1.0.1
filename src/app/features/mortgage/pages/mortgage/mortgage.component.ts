import { Customer } from './../../../../core/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { EditMortgageComponent } from './../edit-mortgage/edit-mortgage.component';
import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../../services/mortgage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/features/customer/services/customer.service';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss'],
})
export class MortgageComponent implements OnInit {
  // public mortgageDetails: Observable<MortgageDetailsCollection>;
  public mortgages: any;
  public customers: Customer = new Customer();
  public id: number;

  constructor(
    private mortgageService: MortgageService,
    private customerService: CustomerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchMortgageList();
    this.fetchCustomerDetail();
  }

  fetchMortgageList() {
    // get customerId from URL
    this.route.queryParams.subscribe((params) => {
      this.id = +params.customerid;
    });
    this.mortgageService.getMortgageList(this.id).subscribe((data) => {
      console.log('mortgage data ' + JSON.stringify(data));

      this.mortgages = data;

      console.log(
        'mortgage inner data ' +
          JSON.stringify(data[0].mortgageDetailsCollection[0].status)
      );
    });
  }
  
// similar to getCustomerById
  fetchCustomerDetail() {
    this.customerService.getCustomerById().subscribe((res) => {
        this.customers = res.filter((f) => f.customerid === this.id);
      // console.log('filter customer data ' + JSON.stringify(this.customer));
    });
  }

  goToList() {
    this.router.navigate(['/ganapati/customer']);
  }

  onAdd(id: number, customerId?) {
    this.router.navigate(['/ganapati/mortgage-detail/add-mortgage-details'], {
      queryParams: { mortgageId: id, customerId: customerId },
    });
  }

  onEdit() {
    // console.log('mortgagedetail '+this.mortgageId + amount );

    const dialogRef = this.dialog.open(EditMortgageComponent, {
      data: {
        /*   mortgageId,
        amount,
         */
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
          (x) => x.mortDetId === 1 // change garne
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

  refreshTable() {}

  onDelete() {}

  showDetails(mortgageId: number, customerId?: number) {
    customerId = this.id;
    this.router.navigate([`/ganapati/mortgage-detail/`], {
      // sending multiple values in query
      queryParams: {
        mortgageId: mortgageId,
        customerid: customerId,
      },
    });
  }
}
