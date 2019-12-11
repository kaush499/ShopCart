import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/cart/cart.model';
import { CartItem } from '../../shared/models/cart/cart-item.model';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class CheckOutService {
    private cart: Cart;
    private shippingAddressId: number;
    private userId: number;

    constructor(private router: Router) {}

    setCheckOutCart(items: CartItem[]) {
        this.cart = new Cart(items);
    }

    getCart() {
        if(!this.cart){
            this.router.navigate(["/cart"]);
        }
        return this.cart;
    }

    setShippingAddress(addressId: number, userId: number) {
        this.shippingAddressId = addressId;
        this.userId = userId
    }
}