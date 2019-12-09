import { Injectable } from '@angular/core';
import { Cart } from '../shared/cart/cart.model';
import { CartItem } from '../shared/cart/cart-item.model';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class CheckOutService {
    private cart: Cart;

    constructor(private router: Router) {}

    setCheckOutCart(items: CartItem[]) {
        this.cart = new Cart(items);
    }

    getCart() {
        if(!this.cart){
            this.router.navigate(["/"]);
        }
        return this.cart;
    }
}