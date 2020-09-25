import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './utils/services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./layouts/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'sign-in-with-gigwerk',
    loadChildren: () => import('./pages/sign-in-with-gigwerk/sign-in-with-gigwerk.module').then( m => m.SignInWithGigwerkPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
