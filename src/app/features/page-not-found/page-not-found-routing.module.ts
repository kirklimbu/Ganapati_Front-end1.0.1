// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// project
import { PageNotFoundComponent } from 'src/app/core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotFoundRoutingModule {}
