import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MortgageDetailService } from '../../services/mortgage-detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/core/models/customer.model';

@Component({
  selector: 'app-mortgage-detail-form',
  templateUrl: './mortgage-detail-form.component.html',
  styleUrls: ['./mortgage-detail-form.component.scss'],
})
export class MortgageDetailFormComponent implements OnInit {
  // props
  motrgageDetailForm: FormGroup;
  mortgageId: number;
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
      console.log('mortgageId from server ' + this.mortgageId);
    });
  }

  buidMortgageDetailForm() {  // START FROM HERE 2077/04/01 THURSDAY --> not able to set rate of interest
    this.motrgageDetailForm = this.fb.group({
      amount: ['', Validators.required],
      nepDate: [''],
      status: [''],
      rate: ['', Validators.required],
    });
  }

  onCancel() {}

  createMortgageDetail(id, rate) {
    this.rate = rate;
    id = this.mortgageId;
console.log('rate & mId: '+ rate + this.mortgageId);

    /* const rate = this.motrgageDetailForm.patchValue({
    })*/

    this.mortgageDetailsService
      .createNewMortgageDetail(id, this.rate, this.motrgageDetailForm.value)
      .subscribe(
        (response) => {
          console.log('successful entry of mortgage detail ' + response);
          // this.router.navigate(["/mortgage-detail"],{relativeTo: this.route}) //dynamic routing
          this.router.navigate(['/mortgage/mortgage-detail']); //static routing
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
