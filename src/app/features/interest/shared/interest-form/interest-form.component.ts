import { Customer } from './../../../../core/models/customer.model';
import { CustomerService } from './../../../customer/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InterestService } from './../../service/interest.service';
import { Interest } from './../../../../core/models/interest.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.scss'],
})
export class InterestFormComponent implements OnInit {
  // props
  interestForm: FormGroup;
  interest: Interest = new Interest();
  customers: Customer = new Customer();
  formSubmitted = false;
  mortgageId: number;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildInterestForm();
    this.fetchParamFromUrl();
  }

  // similar to getCustomerById
  fetchCustomerDetail() {
    this.customerService.getCustomerById().subscribe((res) => {
      // this.customers = res.filter((f) => f.customerid === this.customerId); // get customerId
      console.log('filter customer data ' + JSON.stringify(this.customers));
    });
  }

  fetchParamFromUrl() {
    this.route.queryParamMap.subscribe((params) => {
      this.mortgageId = +params.get('mortgageId');
    });
  }

  buildInterestForm() {
    this.interestForm = this.fb.group({
      amount: [this.interest.amount, [Validators.required]],
      nepDate: [this.interest.nepDate, [Validators.required]],
    });
  }

  getAmountErrorMessage() {
    return this.interestForm.controls['amount'].hasError('required')
      ? 'Amount required.'
      : this.interestForm.controls['amount'].hasError('maxLength')
      ? 'Invalid amount.'
      : this.interestForm.controls['amount'].hasError('minLength')
      ? 'Amount must be atleast of 1 digit.'
      : '';
  }
  getNepaliDateErrorMessage() {
    return this.interestForm.controls['nepDate'].hasError('required')
      ? 'Nepali transaction date required.'
      : '';
  }

  onSave() {
    this.formSubmitted = true;

    if (this.interestForm.valid) {
      this.interestService
        .saveInterest(this.mortgageId, this.interestForm.value)
        .subscribe((res) => {
          console.log('interest saved' + JSON.stringify(res));
          this.router.navigate(['/ganapati/interest'], {
            queryParams: {
              mortgageId: this.mortgageId,
            },
          });
        });
    } else {
    }
  }

  onCancel() {
    this.router.navigate(['/ganapati/interest'], {
      queryParams: {
        mortgageId: this.mortgageId,
      },
    });
  }
}
