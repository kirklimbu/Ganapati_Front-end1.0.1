import { ToastrService } from 'ngx-toastr';
import { MortgageDetailService } from './../../services/mortgage-detail.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MortgageDetail } from 'src/app/core/models/mortgage-detail.model';

@Component({
  selector: 'app-edit-mortgage-detail',
  templateUrl: './edit-mortgage-detail.component.html',
  styleUrls: ['./edit-mortgage-detail.component.scss'],
})
export class EditMortgageDetailComponent implements OnInit {
  // props
  motrgageDetailEditForm: FormGroup;
  mortgageDetail: MortgageDetail = new MortgageDetail();
  motrgageDetailForm: FormGroup;
  mortgageId: number;
  customerId: number;
  mortgageRate: any;
  // mortgageDetail

  selected: any;
  rate: number;
  data2: MortgageDetail = new MortgageDetail();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private mortgageDetailsService: MortgageDetailService,
    public dialogRef: MatDialogRef<EditMortgageDetailComponent>,
    private router: Router,
    private mortgageService: MortgageDetailService,
    private toastr: ToastrService
  ) {
    console.log('injected data' + JSON.stringify(data));
  }

  ngOnInit(): void {
    this.fetchMortgageDetailEditForm();
    this.buidMortgageDetailEditForm();
  }

  fetchMortgageDetailEditForm() {
    console.log('inside fetch mortgage detail edit mortggae');

    this.mortgageService
      .getMortgageDetailEditForm(this.data.mortDetId)
      .subscribe(
        (res) => {
          this.data2 = res;
          console.log('mortgage  data2 ' + JSON.stringify(this.data2)); // START FROM HERE @EVENING FRIDAY --fetch mortdetail data2 --pass it to edit form ---aaile form ma set vako xaena

          this.mortgageRate = res.rate;
          console.log('mortgage  rate ' + JSON.stringify(this.mortgageRate));
          this.mortgageDetail = res.mortgageDetail;
        },
        (err) => {
          this.toastr.error(
            err.error.message
            /* +{
                disableTimeOut: true,
                tapToDismiss: false,
                toastClass: 'toast border-red',
                closeButton: true,
                positionClass: 'bottom-left',
              } */
          );
        }
      );
  }

  buidMortgageDetailEditForm() {
    console.log('inside build');

    this.motrgageDetailEditForm = this.fb.group({
      amount: [this.data.amount, Validators.required],
      status: [this.data.status, Validators.required],
      rate: ['', Validators.required],
    });
  }
  /*
  get setRate() {
    return this.motrgageDetailEditForm.controls.rate.setValue(
      this.mortgageRate
    );
  } */

  saveMortgageDetail() {
    // rate = this.motrgageDetailEditForm.patchValue({});
    if (this.motrgageDetailEditForm.valid) {
      this.mortgageDetailsService
        .saveMortgageDetailEdit(this.motrgageDetailEditForm.value)
        .subscribe(
          (response) => {
            this.toastr.success('Mortgage detail updated successfully.');
            // this.router.navigate(["/mortgage-detail"],{relativeTo: this.route}) //dynamic routing
            this.router.navigate(['ganapati/mortgage-detail'], {
              queryParams: {
                mortgageId: this.mortgageId,
                customerid: this.customerId,
              }, //static routing
            });
          },
          (err) => {

            err = err.error.message
              ? this.toastr.error(err.error.message)
              : this.toastr.error('Error in editing mortgage detail ');
          }
        );
    } else {
      console.log('invalid form'); // remove on production
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
