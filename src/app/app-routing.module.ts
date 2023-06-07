import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidateTokenGuard } from './core/guards/validate-token.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { ProductsComponent } from './feature/home/pages/products/products.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule),
    canActivate: [RedirectGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./feature/protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard]
  },

  { path: 'products', component: ProductsComponent },
  { path: 'products/:categoryId', component: ProductsComponent },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
