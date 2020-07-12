import { Component, OnInit } from '@angular/core';
import { MortgageDetailService } from '../../services/mortgage-detail.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.scss'],
})
export class MortgageDetailComponent implements OnInit {
  // public mortgageDetails: Observable<MortgageDetailsCollection>;
  mortgageDetails;
  private id: number;

  constructor(
    private mortgageDetailsService: MortgageDetailService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const mortgageId = +this.route.snapshot.queryParamMap.get('mortgageId');
    console.log('mortgage id from server ' + mortgageId);
    this.id = mortgageId;

    this.mortgageDetailsService.getMortgageDetailPage(mortgageId).subscribe((data) => {
      this.mortgageDetails = data;
    });
  }

  goToList() {
    this.router.navigate(['/mortgage-detail']);
  }
}
