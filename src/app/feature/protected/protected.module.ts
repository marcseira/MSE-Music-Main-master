import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProtectedRoutingModule } from './protected-routing.module';
import { UserComponent } from './pages/user/user.component';
import { TableComponent } from './shared/components/table/table.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartProductsComponent } from './shared/components/cart-products/cart-products.component';
import { CreditCardComponent } from './shared/components/credit-card/credit-card.component';
import { CreditNumberPipe } from './shared/pipes/credit-number.pipe';
import { CreditNamePipe } from './shared/pipes/credit-name.pipe';
import { PaymentComponent } from './pages/payment/payment.component';
import { RecordComponent } from './shared/components/record/record.component';



@NgModule({
    declarations: [
        UserComponent,
        TableComponent,
        DialogComponent,
        AdminComponent,
        CartComponent,
        CartProductsComponent,
        CreditCardComponent,
        CreditNumberPipe,
        CreditNamePipe,
        PaymentComponent,
        RecordComponent
    ],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        SharedModule,
        ReactiveFormsModule, 
        FormsModule
    ]
})
export class ProtectedModule { }
