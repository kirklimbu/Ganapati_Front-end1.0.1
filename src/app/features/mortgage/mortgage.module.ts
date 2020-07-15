import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MortgageRoutingModule } from './mortgage-routing.module';
import { MortgageComponent } from './pages/mortgage/mortgage.component';
import { MortgageFormComponent } from './shared/mortgage-form/mortgage-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [MortgageComponent, MortgageFormComponent],
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
