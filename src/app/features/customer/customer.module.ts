import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerformComponent } from './shared/customerform/customerform.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditcustomerComponent } from './pages/editcustomer/editcustomer.component';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerformComponent,
    EditcustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    MatTooltipModule
  ],

  providers: [
    
  ]
})
export class CustomerModule { }
