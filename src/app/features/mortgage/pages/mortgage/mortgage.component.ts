import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../../services/mortgage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss'],
})
export class MortgageComponent implements OnInit {
  // public mortgageDetails: Observable<MortgageDetailsCollection>;
  public mortgages: any;
  public id: number;

  constructor(
    private mortgageService: MortgageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchMortgageList();
  }

  fetchMortgageList() {
    // get customerId from URL
    this.route.queryParams.subscribe((params) => {
      this.id = +params.customerid;
    });
    this.mortgageService.getMortgageList(this.id).subscribe((data) => {
      this.mortgages = data;
    });
  }

  fetchCustomerDetail() {
    // get customer by id and show details
  }
  goToList() {
    this.router.navigate(['/mortgage-detail']);
  }

  onAdd(id: number) {
    console.log('on add called ' +JSON.stringify(id));

    this.router.navigate(['/ganapati/mortgage-detail/add-mortgage-details'], {
      queryParams: { mortgageId: id },
    });
  }
}