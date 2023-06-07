import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ValidateRoleGuard } from 'src/app/core/guards/validate-role.guard';
import { ValidateRoleAdminGuard } from 'src/app/core/guards/validate-role-admin.guard';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [

  {
    path: '',
    component: UserComponent,
    canActivate: [ValidateRoleGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ValidateRoleAdminGuard],
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
