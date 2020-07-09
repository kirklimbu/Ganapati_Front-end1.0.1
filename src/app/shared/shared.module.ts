
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
// third-party
// import { NgxSpinnerModule } from "ngx-spinner";
import { BreadcrumbModule } from 'angular-crumbs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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

const DECLARATIONS: any[] =
  [
    FormGroupComponent,
    ActionButtonsComponent,
    BreadcrumbComponent,
    DeletePopupComponent,
    ListPageTemplateComponent,
    SaveCancelButtonsComponent,
    TableTopBarComponent,
    PageHeaderComponent,
    TestModalComponent,


  ]
@NgModule({
  declarations: [
    ...DECLARATIONS,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbModule,
    FormsModule
    // NgxSpinnerModule
  ],
  exports: [
    MaterialModule,
    NgbModule,
    BreadcrumbModule,
    ...DECLARATIONS
  ]
})
export class SharedModule { }
