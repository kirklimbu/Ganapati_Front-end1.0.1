import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MortgageDetailsRoutingModule } from './mortgage-details-routing.module';
import { MortgageDetailComponent } from './pages/mortgage-detail/mortgage-detail.component';
import { MortgageDetailFormComponent } from './shared/mortgage-detail-form/mortgage-detail-form.component';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditMortgageDetailComponent } from './pages/edit-mortgage-detail/edit-mortgage-detail.component';

@NgModule({
  declarations: [MortgageDetailComponent, MortgageDetailFormComponent, EditMortgageDetailComponent],
  imports: [
    CommonModule,
    MortgageDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class MortgageDetailsModule {}
