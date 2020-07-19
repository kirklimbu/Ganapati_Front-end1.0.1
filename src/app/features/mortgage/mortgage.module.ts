import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MortgageRoutingModule } from './mortgage-routing.module';
import { MortgageComponent } from './pages/mortgage/mortgage.component';
import { MortgageFormComponent } from './shared/mortgage-form/mortgage-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditMortgageComponent } from './pages/edit-mortgage/edit-mortgage.component';

@NgModule({
  declarations: [MortgageComponent, MortgageFormComponent, EditMortgageComponent],
  imports: [
    CommonModule,
    MortgageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MatTooltipModule,
  ],
})
export class MortgageModule {}
