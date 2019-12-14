import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from '../../../../shared/models/address.model';
import { ShippingService } from '../../../services/shipping.service';
import { UserService } from 'src/app/user/services/user.service';

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
    if(this.editMode) {
      console.log("edit");
      this.shippingService.updateAddress(this.address.addressId, newAddess, this.userId)
    }else {
      this.shippingService.addNewAddress(this.userId, newAddess);
    }
  }

  onCancel() {
    this.shippingService.onStopAddrForm();
  }

}
