import { CustomerformComponent } from './shared/customerform/customerform.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent
  },
  {
    path: 'add-customer',
    component: CustomerformComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
