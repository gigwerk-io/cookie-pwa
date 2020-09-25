import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'account',
    loadChildren: () => import('../../pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'job-details/:id',
    loadChildren: () => import('../../pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
