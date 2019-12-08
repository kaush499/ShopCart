import { Injectable } from '@angular/core';
import { Cart } from '../shared/cart/cart.model';
import { CartItem } from '../shared/cart/cart-item.model';

@Injectable({providedIn: "root"})
export class CheckOutService {
    private cart: Cart;

    setCheckOutCart(items: CartItem[]) {
        this.cart = new Cart(items);
    }

    getCart() {
        return this.cart;
    }
}