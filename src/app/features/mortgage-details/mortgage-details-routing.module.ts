import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MortgageDetailComponent } from './pages/mortgage-detail/mortgage-detail.component';
import { MortgageDetailFormComponent } from './shared/mortgage-detail-form/mortgage-detail-form.component';

const routes: Routes = [
  {
    path: '',
    component: MortgageDetailComponent,
  },
  {
    path: 'add-mortgage-details',
    component: MortgageDetailFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortgageDetailsRoutingModule {}
