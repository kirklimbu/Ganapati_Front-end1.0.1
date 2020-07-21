import { NgxSpinnerModule } from 'ngx-spinner';
// angular
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
// third-party
// import { NgxSpinnerModule } from "ngx-spinner";
import { BreadcrumbModule } from 'angular-crumbs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// project
import { MaterialModule } from './material/material/material.module';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { ListPageTemplateComponent } from './components/list-page-template/list-page-template.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TableTopBarComponent } from './components/table-top-bar/table-top-bar.component';
import { SaveCancelButtonsComponent } from './components/save-cancel-buttons/save-cancel-buttons.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';

const DECLARATIONS: any[] = [
  FormGroupComponent,
  ActionButtonsComponent,
  BreadcrumbComponent,
  DeletePopupComponent,
  ListPageTemplateComponent,
  SaveCancelButtonsComponent,
  TableTopBarComponent,
  PageHeaderComponent,
  TestModalComponent,
  NgxSpinnerComponent,
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    FormsModule,
    NgxSpinnerModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  exports: [
    BreadcrumbModule,
    MaterialModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ...DECLARATIONS,
  ],
})
export class SharedModule {}
