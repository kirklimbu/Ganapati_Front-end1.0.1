// angular
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// project
import { NgxSpinnerComponent } from './shared/components/ngx-spinner/ngx-spinner.component';
import { SharedModule } from './shared/shared.module';

/* export function tokenGetter() {
  return localStorage.getItem('token'); // erp sample
} */

@NgModule({
  declarations: [AppComponent,
    // NgxSpinnerComponent
  ],
  imports: [
    // core & shared
    CoreModule,
    SharedModule,

    // angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // app
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        throwNoTokenError: true,
      },
    }),
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
