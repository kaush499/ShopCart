import { NgModule } from '@angular/core';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { AddressFormComponent } from './components/shipping/address-form/address-form.component';
import { ShippingAddressItemComponent } from './components/shipping/shipping-address-item/shipping-address-item.component';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
    declarations: [
        CheckOutComponent,
        ShippingComponent,
        AddressFormComponent,
        ShippingAddressItemComponent,
        PaymentComponent
    ],
    imports: [
        CheckOutRoutingModule,
        SharedModule
    ]
})
export class CheckOutModule {}