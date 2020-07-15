import { Mortgage } from './../../../../core/models/mortgage.model';
import { Component, OnInit } from '@angular/core';
import { MortgageDetailService } from '../../services/mortgage-detail.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/core/models/customer.model';
import { MortgageService } from 'src/app/features/mortgage/services/mortgage.service';

@Component({
  selector: 'app-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.scss'],
})
export class MortgageDetailComponent implements OnInit {
  // public mortgageDetails: Observable<MortgageDetailsCollection>;
  private customerId: number;
  private mortgageId: number;
  interest: number;
  // test table
  mortgages: any;
  mortgageDetails: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['date', 'status', 'days', 'amount', 'action'];
  // test variables
  fakeMortId: any;
  amount: any;
  valuation: any;

  constructor(
    private mortgageDetailsService: MortgageDetailService,
    private mortgageService: MortgageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchMortgageDetails();
    this.fetchMortgage();
  }

  fetchMortgage() {
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
    this.route.queryParams.subscribe((params) => {
      this.mortgageId = +params.mortgageId;
    });
    this.mortgageDetailsService.getMortgageDetail(this.mortgageId).subscribe(
      (data) => {
        if (data) {
          this.interest = data.interestList[0].amount;
          this.mortgageDetails = data.mortgageDetailList;
        } else {
          // code
        }
      },
      (err) => {
        console.log('server error' + err.message);
      }
    );
  }

  goToList() {
    this.router.navigate(['/mortgage-detail']);
  }
}
