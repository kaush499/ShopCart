import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../check-out/shipping/address.model';
import { NgForm } from '@angular/forms';
import { ShippingService } from '../check-out/shipping/shipping.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input('addr') address: Address;
  @Input('editMode') editMode: boolean;
  private userId: number;
  selAddr: Address

  constructor(private shippingService: ShippingService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.selAddr = new Address(this.address);
    console.log(this.editMode);
  }

  onSave(addressForm: NgForm) {
    const val = addressForm.value;
    const newAddess = {
      name: val.name,
      mob_number: val.number,
      address: val.address,
      state: val.state,
      city: val.city,
      pincode: val.pincode
    };
    if(this.editMode === true) {
      this.shippingService.updateAddress(this.address.addressId, newAddess, this.userId)
    }else {
      this.shippingService.addNewAddress(this.userId, newAddess);
    }
  }

  onCancel() {
    this.shippingService.onStopAddrForm();
  }

}
