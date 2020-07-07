import { HttpErrorInterceptor } from './core/http-interceptors/http-error/http-error-interceptor.interceptor';
import { LoginService } from './features/login/services/login.service';
import { HttpTokenInterceptor } from './core/http-interceptors/http-token/http-token-interceptor.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './shared/shared.module';
// projectimport { AuthGuardService } from './core/guards/auth/auth-guard.service';
import { AuthGuardService } from './core/guards/auth/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
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
          return localStorage.getItem("token");
        },
        throwNoTokenError: true,

      },
    }),
  ],
  providers: [
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
