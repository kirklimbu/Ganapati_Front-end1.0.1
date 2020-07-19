import { InterestFormComponent } from './shared/interest-form/interest-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterestComponent } from './pages/interest/interest.component';

const routes: Routes = [
  {
    path: '',
    component: InterestComponent,
  },{
    path: 'add-interest',
    component: InterestFormComponent,
    data:{
      breadcrumb:'Add-interest'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterestRoutingModule {}
