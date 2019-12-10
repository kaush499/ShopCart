import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Address } from '../address.model';
import { Subscription } from 'rxjs';
import { ShippingService } from '../shipping.service';

@Component({
  selector: 'app-shipping-address-item',
  templateUrl: './shipping-address-item.component.html',
  styleUrls: ['./shipping-address-item.component.css']
})
export class ShippingAddressItemComponent implements OnInit, OnDestroy {
  @Input('address') address: Address;
  private editSubs: Subscription
  addressForm: boolean = false;

  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
    this.editSubs = this.shippingService.getEditMode()
      .subscribe(val => {
        if(val.editMode && val.addressId === this.address.addressId) this.addressForm = true;
        else this.addressForm = false;
      })
  }

  onEdit() {
    this.shippingService.onStartAddrForm(this.address.addressId);
  }

  ngOnDestroy() {
    this.editSubs.unsubscribe();
  }
}
