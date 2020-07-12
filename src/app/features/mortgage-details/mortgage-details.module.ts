import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MortgageDetailsRoutingModule } from './mortgage-details-routing.module';
import { MortgageDetailComponent } from './pages/mortgage-detail/mortgage-detail.component';
import { MortgageDetailFormComponent } from './shared/mortgage-detail-form/mortgage-detail-form.component';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MortgageDetailComponent, MortgageDetailFormComponent],
  imports: [
    CommonModule,
    MortgageDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class MortgageDetailsModule {}
