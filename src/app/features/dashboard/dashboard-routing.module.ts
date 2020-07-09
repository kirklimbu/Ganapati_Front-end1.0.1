import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// project
import { DashboardComponent } from './pages/dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./../customer/customer.module').then(m => m.CustomerModule)
      },
      // {
      //   path: 'home',
      //   loadChildren: () => import('./../home/home.module').then(m => m.HomeModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }