// angular
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// project
import { MortgageDetailService } from '../../services/mortgage-detail.service';
import { MortgageDetail } from 'src/app/core/models/mortgage-detail.model';

@Component({
  selector: 'app-mortgage-detail-form',
  templateUrl: './mortgage-detail-form.component.html',
  styleUrls: ['./mortgage-detail-form.component.scss'],
})
export class MortgageDetailFormComponent implements OnInit {
  // props
  mortgageDetail: MortgageDetail = new MortgageDetail();
  motrgageDetailForm: FormGroup;
  mortgageId: number;
  customerId: number;
  selected: any;
  rate: number;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  constructor(
    private fb: FormBuilder,
    private mortgageDetailsService: MortgageDetailService,
    private route: ActivatedRoute,
    private router: Router // private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getQueryParamValue();
    this.buidMortgageDetailForm();
  }

  getQueryParamValue() {
    this.route.queryParams.subscribe((params) => {
      this.mortgageId = +params.mortgageId;
      this.customerId = +params.customerId;
      console.log(
        'mortgageId from server ' + this.mortgageId + this.customerId
      );
    });
  }

  buidMortgageDetailForm() {
    // START FROM HERE 2077/04/01 THURSDAY --> not able to set rate of interest
    this.motrgageDetailForm = this.fb.group({
      amount: [this.mortgageDetail.amount, Validators.required],
      nepDate: [this.mortgageDetail.nepDate, Validators.required],
      status: [this.mortgageDetail.status, Validators.required],
      rate: [this.mortgageDetail.rate, Validators.required],
    });
  }

  onCancel() {}

  createMortgageDetail(id, rate) {
    // this.rate = rate;
    id = this.mortgageId;
    console.log('rate & mId: ' + rate + this.mortgageId);

    rate = this.motrgageDetailForm.patchValue({});

    this.mortgageDetailsService
      .createNewMortgageDetail(id, this.rate, this.motrgageDetailForm.value)
      .subscribe(
        (response) => {
          console.log(
            'successful entry of mortgage detail ' + JSON.stringify(response)
          );
          // this.router.navigate(["/mortgage-detail"],{relativeTo: this.route}) //dynamic routing
          this.router.navigate(['ganapati/mortgage-detail'], {
            queryParams: {
              mortgageId: this.mortgageId,
              customerid: this.customerId,
            }, //static routing
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
