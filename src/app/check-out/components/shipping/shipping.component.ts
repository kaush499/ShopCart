import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from '../../../shared/models/address.model';
import { ShippingService } from '../../services/shipping.service';
import { UserService } from 'src/app/user/services/user.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit, OnDestroy {
  address: Address[];
  private userId: number;
  addressForm: boolean = false;
  selectedAddress: number;
  emptyAddress = {}
  private addressSubs: Subscription
  private editSubs: Subscription;

  constructor(private shippingService: ShippingService,
              private userService: UserService,
              private checkOutService: CheckOutService) { }

  async ngOnInit() {
    this.userId = this.userService.getUserId();
    this.shippingService.getAllAddress(this.userId);
    this.addressSubs = this.shippingService.getAddressStatus()
      .subscribe(val => {
        this.address = val;
      });

   this.editSubs = this.shippingService.getEditMode()
    .subscribe(val => {
      if(val.editMode && val.addressId === -1) this.addressForm = true;
      else this.addressForm = false;
    });
  }

  onAddNewAddress() {
    this.shippingService.onStartAddrForm(-1);
  }

  onSelectAddress(selectedAddressForm: NgForm ) {
    const selAddressId = selectedAddressForm.value.shippingAddress;
    this.checkOutService.setShippingAddress(selAddressId, this.userId);
  }

  ngOnDestroy() {
    this.addressSubs.unsubscribe();
    this.editSubs.unsubscribe();
  }

}
