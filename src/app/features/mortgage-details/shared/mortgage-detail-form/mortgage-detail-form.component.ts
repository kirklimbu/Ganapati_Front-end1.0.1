import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MortgageDetailService } from '../../services/mortgage-detail.service';

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
    // this.toastrService.success('wel-come to create new mortgage-details page');

    const id = +this.route.snapshot.paramMap.get('id');
    console.log('mortgageId from server ' + id);
    this.mortgageId = id;

    this.motrgageDetailForm = this.fb.group({
      amount: ['', Validators.required],
      // day: ['', Validators.required],
      nepDate: [''],
      status: [''],
      rate: ['', Validators.required],
    });
  }

  onCancel() {}

  createMortgageDetail(id, rate) {
    this.mortgageId = id;
    this.rate = rate;

    /* const rate = this.motrgageDetailForm.patchValue({
    })*/
    console.log(
      'id & rate inside createMortgageDetail ' + this.mortgageId,
      this.rate
    );

    this.mortgageDetailsService
      .createNewMortgageDetail(
        this.mortgageId,
        this.rate,
        this.motrgageDetailForm.value
      )
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
