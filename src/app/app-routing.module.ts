import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./layouts/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-in-with-gigwerk',
    loadChildren: () => import('./pages/sign-in-with-gigwerk/sign-in-with-gigwerk.module').then( m => m.SignInWithGigwerkPageModule)
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
