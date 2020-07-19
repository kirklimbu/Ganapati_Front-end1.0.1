import { EditMortgageDetailComponent } from './pages/edit-mortgage-detail/edit-mortgage-detail.component';
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
    data:{
      breadcrumb:'Add mortgage-detail'
    }
  },
  {
    path: 'edit-mortgage-details',
    component: EditMortgageDetailComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortgageDetailsRoutingModule {}
