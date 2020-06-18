import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    ContentWrapperComponent,
    FooterComponent,
    NavbarComponent,
    SidenavComponent,
    PageNotFoundComponent,

  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
