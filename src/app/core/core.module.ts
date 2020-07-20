import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../shared/material/material/material.module';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuardService } from './guards/auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http-interceptors/http-token/http-token-interceptor.interceptor';
import { HttpErrorInterceptor } from './http-interceptors/http-error/http-error-interceptor.interceptor';

const DECLATATIONS: any[] = [
  ContentWrapperComponent,
  FooterComponent,
  NavbarComponent,
  SidenavComponent,
  PageNotFoundComponent,
];
@NgModule({
  declarations: [...DECLATATIONS],
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
  exports: [...DECLATATIONS],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
