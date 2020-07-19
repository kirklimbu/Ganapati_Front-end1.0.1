import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterestRoutingModule } from './interest-routing.module';
import { InterestFormComponent } from './shared/interest-form/interest-form.component';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InterestComponent } from './pages/interest/interest.component';

@NgModule({
  declarations: [InterestFormComponent, InterestComponent],
  imports: [
    CommonModule,
    InterestRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class InterestModule {}
