import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from './address.model';
import { ShippingService } from './shipping.service';
import { UserService } from 'src/app/user/user.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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

  constructor(private shippingService: ShippingService,
              private userService: UserService) { }

  async ngOnInit() {
    this.userId = this.userService.getUserId();
    this.shippingService.getAllAddress(this.userId);
    this.addressSubs = this.shippingService.getAddressStatus()
      .subscribe(val => {
        this.address = val;
      })
  }

  onAddNewAddress() {
    this.addressForm = true;
  }

  onSelectAddress(selectedAddressForm: NgForm ) {
    console.log(selectedAddressForm.value);
  }

  ngOnDestroy() {
    this.addressSubs.unsubscribe();
  }

}
