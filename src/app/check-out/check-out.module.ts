import { NgModule } from '@angular/core';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { AddressFormComponent } from './components/shipping/address-form/address-form.component';
import { ShippingAddressItemComponent } from './components/shipping/shipping-address-item/shipping-address-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymetMethodComponent } from './components/paymet-method/paymet-method.component';
import { CheckOutService } from './services/check-out.service';
import { ShippingService } from './services/shipping.service';

@NgModule({
    declarations: [
        CheckOutComponent,
        ShippingComponent,
        AddressFormComponent,
        ShippingAddressItemComponent,
        PaymetMethodComponent
    ],
    imports: [
        CheckOutRoutingModule,
        SharedModule
    ]
})
export class CheckOutModule {}