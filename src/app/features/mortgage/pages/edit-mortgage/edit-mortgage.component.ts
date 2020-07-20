import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mortgage } from 'src/app/core/models/mortgage.model';
import { MortgageService } from '../../services/mortgage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-edit-mortgage',
  templateUrl: './edit-mortgage.component.html',
  styleUrls: ['./edit-mortgage.component.scss'],
})
export class EditMortgageComponent implements OnInit {
  // props
  mortgageEditForm: FormGroup;
  mortgage: Mortgage = new Mortgage();

  mortgageId: number;

  constructor(
    private fb: FormBuilder,
    private mortgageService: MortgageService,
    private route: ActivatedRoute,
    private router: Router // private toastr: NgxToastrS,
  ) {}

  ngOnInit(): void {
    this.getParamsFromUrl();
    this.buildMortgageEditForm();
  }

  getParamsFromUrl() {
    this.route.queryParams.subscribe((params) => {
      this.mortgageId = +params.mortgageId;

      this.mortgageService.getMortgageById(this.mortgageId).subscribe((res) => {
        const mortgageData = res;
        console.log('mortgage from server ' + JSON.stringify(mortgageData));
        this.buildMortgageEditForm();
      });
    });
  }

  buildMortgageEditForm() {
    this.mortgageEditForm = this.fb.group({
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
    return this.mortgageEditForm.controls['qty'].hasError('required')
      ? 'Quantity required.'
      : this.mortgageEditForm.controls['qty'].hasError('maxLength')
      ? 'Invalid quantity.'
      : this.mortgageEditForm.controls['qty'].hasError('minLength')
      ? 'Quantity must be atleast of 1 digit.'
      : '';
  }

  getReasonErrorMessage() {
    return this.mortgageEditForm.controls['reason'].hasError('required')
      ? 'Reason required.'
      : this.mortgageEditForm.controls['reason'].hasError('maxLength')
      ? 'Invalid reason.'
      : this.mortgageEditForm.controls['reason'].hasError('minlength')
      ? 'Reason must be atleast of 2 characters.'
      : '';
  }
  getAmountErrorMessage() {
    return this.mortgageEditForm.controls['amount'].hasError('required')
      ? 'Amount required.'
      : this.mortgageEditForm.controls['amount'].hasError('maxLength')
      ? 'Invalid amount.'
      : this.mortgageEditForm.controls['amount'].hasError('minLength')
      ? 'Amount must be atleast of 1 digit.'
      : '';
  }
  getNotificationErrorMessage() {
    return this.mortgageEditForm.controls['notiSeen'].hasError('required')
      ? 'Notification required.'
      : this.mortgageEditForm.controls['notiSeen'].hasError('maxLength')
      ? 'Invalid notification number.'
      : this.mortgageEditForm.controls['notiSeen'].hasError('minLength')
      ? 'There must be atleat 1 notification. '
      : '';
  }
  getFakeMortIdrrorMessage() {
    return this.mortgageEditForm.controls['fakeMortId'].hasError('required')
      ? 'FakeMortgage Id required.'
      : this.mortgageEditForm.controls['fakeMortId'].hasError('maxLength')
      ? 'Invalid fakeMortId.'
      : this.mortgageEditForm.controls['fakeMortId'].hasError('minLength')
      ? 'FakeMortId must be atleast of 2 characters.'
      : '';
  }
  getNepaliDateErrorMessage() {
    return this.mortgageEditForm.controls['nepDate'].hasError('required')
      ? 'Nepali transaction date required.'
      : '';
  }

  onSave(id?, mortgage?) {
    // get customerId from URL
    mortgage = this.mortgageEditForm.value;
    console.log(
      'customerId inside createMortgage ' + id + ' ' + JSON.stringify(mortgage)
    );
    this.mortgageService.saveEditedMortgage(this.mortgageEditForm.value).subscribe(
      (response) => {
        console.log('inside new mortgage' + response);
        // msg via toastr
        this.router.navigate(['/ganapati/mortgage'], {
          queryParams: { customerid: id },
        });
      },
      (error) => {
        console.log('error inside new mortgage ' + error);
        // msg via toastr
      }
    );
  }

  onCancel(id?) {
    console.log('cancel triggered for edit mortgaege');

    this.router.navigate(['/ganapati/mortgage'], {
      // queryParams: { customerid: id },
    });

  }
}
