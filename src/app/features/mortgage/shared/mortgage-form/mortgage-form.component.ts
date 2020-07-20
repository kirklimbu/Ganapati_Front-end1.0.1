import { ToastrService } from 'ngx-toastr';
import { Customer } from './../../../../core/models/customer.model';
import { CustomerService } from './../../../customer/services/customer.service';
import { Mortgage } from './../../../../core/models/mortgage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MortgageService } from '../../services/mortgage.service';

@Component({
  selector: 'app-mortgage-form',
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.scss'],
})
export class MortgageFormComponent implements OnInit {
  // props
  mortgageForm: FormGroup;
  mortgage: Mortgage = new Mortgage();
  customers: Customer = new Customer();
  customerId: number;

  constructor(
    private fb: FormBuilder,
    private mortgageService: MortgageService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchCustomerDetail();
    this.getParamsFromUrl();
    this.buildMortgageForm();
  }

  getParamsFromUrl() {
    this.route.queryParams.subscribe((params) => {
      this.customerId = +params.customerid;
    });
  }

  // similar to getCustomerById
  fetchCustomerDetail() {
    this.customerService.getCustomerById().subscribe((res) => {
      this.customers = res.filter((f) => f.customerid === this.customerId);
    });
  }

  buildMortgageForm() {
    this.mortgageForm = this.fb.group({
      qty: [
        this.mortgage.qty,
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
      ],
      reason: [
        this.mortgage.reason,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      notiSeen: [
        this.mortgage.notiSeen,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      amount: [
        this.mortgage.amount,
        [Validators.required, Validators.minLength(1), Validators.maxLength(6)],
      ],
      fakeMortId: [
        this.mortgage.fakeMortId,
        [Validators.required, Validators.minLength(1), Validators.maxLength(6)],
      ],
      nepDate: [this.mortgage.nepDate, Validators.required],
    });
  }

  // error message block
  getQuantityErrorMessage() {
    return this.mortgageForm.controls['qty'].hasError('required')
      ? 'Quantity required.'
      : this.mortgageForm.controls['qty'].hasError('maxLength')
      ? 'Invalid quantity.'
      : this.mortgageForm.controls['qty'].hasError('minLength')
      ? 'Quantity must be atleast of 1 digit.'
      : '';
  }

  getReasonErrorMessage() {
    return this.mortgageForm.controls['reason'].hasError('required')
      ? 'Reason required.'
      : this.mortgageForm.controls['reason'].hasError('maxLength')
      ? 'Invalid reason.'
      : this.mortgageForm.controls['reason'].hasError('minlength')
      ? 'Reason must be atleast of 2 characters.'
      : '';
  }
  getAmountErrorMessage() {
    return this.mortgageForm.controls['amount'].hasError('required')
      ? 'Amount required.'
      : this.mortgageForm.controls['amount'].hasError('maxLength')
      ? 'Invalid amount.'
      : this.mortgageForm.controls['amount'].hasError('minLength')
      ? 'Amount must be atleast of 1 digit.'
      : '';
  }
  getNotificationErrorMessage() {
    return this.mortgageForm.controls['notiSeen'].hasError('required')
      ? 'Notification required.'
      : this.mortgageForm.controls['notiSeen'].hasError('maxLength')
      ? 'Invalid notification number.'
      : this.mortgageForm.controls['notiSeen'].hasError('minLength')
      ? 'There must be atleat 1 notification. '
      : '';
  }
  getFakeMortIdrrorMessage() {
    return this.mortgageForm.controls['fakeMortId'].hasError('required')
      ? 'FakeMortgage Id required.'
      : this.mortgageForm.controls['fakeMortId'].hasError('maxLength')
      ? 'Invalid fakeMortId.'
      : this.mortgageForm.controls['fakeMortId'].hasError('minLength')
      ? 'FakeMortId must be atleast of 2 characters.'
      : '';
  }
  getNepaliDateErrorMessage() {
    return this.mortgageForm.controls['nepDate'].hasError('required')
      ? 'Nepali transaction date required.'
      : '';
  }

  onSave() {
    this.mortgageService
      .addMortgage(this.customerId, this.mortgageForm.value)
      .subscribe(
        (response) => {
          console.log('inside new mortgage' + response);
          this.toastr.success('New Mortgage added successfuly.');
          this.router.navigate(['/ganapati/mortgage'], {
            queryParams: { customerid: this.customerId },
          });
        },
        (err) => {
          if (err.error.errors[0].defaultMessage) {
            this.toastr.error(err.error.errors[0].defaultMessage);
          } else {
            this.toastr.error('Error adding new mortgage.');
          }
        }
      );
  }

  onCancel() {
    this.router.navigate(['/ganapati/customer']);
  }
}
