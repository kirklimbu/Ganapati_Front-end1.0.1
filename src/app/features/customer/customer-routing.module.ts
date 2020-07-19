import { MortgageComponent } from './../mortgage/pages/mortgage/mortgage.component';
import { EditcustomerComponent } from './pages/editcustomer/editcustomer.component';
import { CustomerformComponent } from './shared/customerform/customerform.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    // children: [
    //   {
    //     path: 'mortgage',
    //     loadChildren: () => import('./../mortgage/mortgage.module').then(m => m.MortgageModule)
    //   }
    // ]
  },
  {
    path: 'add-customer',
    component: CustomerformComponent,
    data:{
      breadcrumb:'Add customer'
    }
  },
  {
    path: 'edit-customer',
    component: EditcustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
