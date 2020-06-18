import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material/material.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports:[
    MaterialModule,
    NgbModule
  ]
})
export class SharedModule { }
