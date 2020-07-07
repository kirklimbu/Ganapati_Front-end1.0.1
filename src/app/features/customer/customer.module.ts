import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerformComponent } from './shared/customerform/customerform.component';


@NgModule({
  declarations: [CustomerComponent, CustomerformComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
