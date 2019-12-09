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
  @Input('address') address: any;
  @Input('editMode') editMode: boolean;
  private userId: number;

  constructor(private shippingService: ShippingService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    console.log(this.address);
    console.log(this.editMode);
  }

  onSave(addressForm: NgForm) {
  console.log(addressForm.value);
    if(this.editMode) {
      this.shippingService.updateAddress(this.address.addressId, addressForm.value, this.userId)
    }else {
      this.shippingService.addNewAddress(this.userId, addressForm.value);
    }
  }

}
