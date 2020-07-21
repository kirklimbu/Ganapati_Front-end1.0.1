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
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomeModule),
        data: {},
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./../customer/customer.module').then((m) => m.CustomerModule),
        data: {
          breadcrumb: 'Customer list',
        },
      },
      {
        path: 'mortgage',
        loadChildren: () =>
          import('./../mortgage/mortgage.module').then((m) => m.MortgageModule),
        data: {
          breadcrumb: 'Mortgage list',
        },
      },
      {
        path: 'mortgage-detail',
        loadChildren: () =>
          import('../mortgage-details/mortgage-details.module').then(
            (m) => m.MortgageDetailsModule
          ),
        data: {
          breadcrumb: 'Mortgage-detail list',
        },
      },
      {
        path: 'interest',
        loadChildren: () =>
          import('./../interest/interest.module').then((m) => m.InterestModule),
        data: {
          breadcrumb: 'Interest ',
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./../profile/profile.module').then((m) => m.ProfileModule),
        data: {
          breadcrumb: 'Profile ',
        },
      },
      {
        path: 'page-not-found',
        loadChildren: () =>
          import('./../page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundModule
          ),
        /* data: {
          breadcrumb: 'Interest ',
        }, */
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customer', // change according to need
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'page-not-found',
      },

      // {
      //   path: 'home',
      //   loadChildren: () => import('./../home/home.module').then(m => m.HomeModule)
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
