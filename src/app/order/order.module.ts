import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderFailureComponent } from './components/order-failure/order-failure.component';



@NgModule({
  declarations: [
    OrderSuccessComponent,
    OrderFailureComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrderModule { }
