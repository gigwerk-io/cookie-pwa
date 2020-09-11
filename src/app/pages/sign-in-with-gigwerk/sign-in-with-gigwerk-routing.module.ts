import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInWithGigwerkPage } from './sign-in-with-gigwerk.page';

const routes: Routes = [
  {
    path: '',
    component: SignInWithGigwerkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInWithGigwerkPageRoutingModule {}
