import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage,          
  },
  {
    path: 'profile/:user_id',
    loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('../../pages/account/account.module').then( m => m.AccountPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
