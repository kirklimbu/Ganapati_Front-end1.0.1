import { MortgageFormComponent } from './shared/mortgage-form/mortgage-form.component';
import { MortgageComponent } from './pages/mortgage/mortgage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: MortgageComponent
    // component: MortgageFormComponent
  },
  {
    path: 'add-mortgage',
    component: MortgageFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MortgageRoutingModule { }
