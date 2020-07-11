import { Mortgage } from './../../../../core/models/mortgage.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MortgageService } from '../../services/mortgage.service';

@Component({
  selector: 'app-mortgage-form',
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.scss']
})
export class MortgageFormComponent implements OnInit {

  // props
  mortgageForm: FormGroup;
  mortgage: Mortgage = new Mortgage();

  customerId: number;

  constructor(
    private fb: FormBuilder,
    private mortgageService: MortgageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getParamsFromUrl() {

  }

  buildMortgageForm() {
    this.mortgageForm = this.fb.group({
      qty: ["", Validators.required],
      reason: ["", Validators.required],
      notiSeen: ["", Validators.required],
      amount: ["", Validators.required],
      fakeMortId: ["", Validators.required],
      nepDate: ["", Validators.required]
      // registerDate: ['', Validators.required]
    });
  }

  onSave(id) {
    this.customerId = id;
    console.log("customerId inside createMortgage " + this.customerId);
    this.mortgageService
      .addMortgage(this.customerId, this.mortgageForm.value)
      .subscribe(
        response => {
          console.log("inside new mortgage" + response);
          this.router.navigate(["/customerlist"]);

          window.alert("new mortgage created successfully ");
        },
        error => {
          console.log("error inside new mortgage " + error);
        }
      );
  }

  onCancel() { }


}
