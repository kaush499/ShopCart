import { NgModule } from '@angular/core';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        MyOrdersComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([])
    ]
})
export class UserModule {}