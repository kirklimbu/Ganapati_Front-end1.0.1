import { Customer } from './../../../../core/models/customer.model';
import { CustomerService } from './../../../customer/services/customer.service';
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
  customers: Customer = new Customer();
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
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router // private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCustomerDetail();
    this.getQueryParamValue();
    this.buidMortgageDetailForm();
  }

  getQueryParamValue() {
    this.route.queryParams.subscribe((params) => {
      this.mortgageId = +params.mortgageId;
      this.customerId = +params.customerId;
      console.log(
        'mortgageId from server ' + `${this.mortgageId}, ${this.customerId}`
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

  // similar to getCustomerById
  fetchCustomerDetail() {
    this.customerService.getCustomerById().subscribe((res) => {
      this.customers = res.filter((f) => f.customerid === this.customerId);
      console.log('filter customer data ' + JSON.stringify(this.customers));
    });
  }

  getAmountErrorMessage() {
    return this.motrgageDetailForm.controls['amount'].hasError('required')
      ? 'Amount is required.'
      : '';
  }
getStatusErrorMessage() {
    return this.motrgageDetailForm.controls['status'].hasError('required')
      ? 'Status is required.'
      : '';
  }
getRateErrorMessage() {
    return this.motrgageDetailForm.controls['rate'].hasError('required')
      ? 'Rate of interest is required.'
      : '';
  }
getNepaliDateErrorMessage() {
    return this.motrgageDetailForm.controls['nepDate'].hasError('required')
      ? 'Nepali transaction date required.'
      : '';
  }

  onCancel() {
    console.log('cancel triggered');

    this.router.navigate(['ganapati/mortgage'], {
      queryParams: {
        customerid: this.customerId,
      },
    });
  }

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
