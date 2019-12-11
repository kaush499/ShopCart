import { Product } from '../../shared/models/product/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../shared/models/cart/cart-item.model';

@Injectable({ providedIn: "root" })
export class CartFunction {

    constructor(private http: HttpClient) {}

    // stores the cart id and its expiry value to local storage
    storeCart(guestId: string) {
        const now = new Date();
        const cartExpiration = new Date(now.getTime() + 3*24*3600*1000);
        let cart = {
            guestId: guestId,
            cartExpiration: cartExpiration
        };
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // retrieves the cart from the local storage
    async retrieveCart() {
        let cart = localStorage.getItem('cart');
        if(cart){
            let guestCart = JSON.parse(cart);
            const now = new Date();
            const cartExp = new Date(guestCart.cartExpiration);
            if(cartExp.getTime() - now.getTime() > 0) return guestCart.guestId;

            localStorage.removeItem('cart');
            return null;
        }
        return null;   
    }

    // creates new guest id from server
    async createGuest() { 
        return this.http.get<{ guestId: number }>('http://localhost:3000/guest')
    }

    // returns the newly formed cartItem
    formNewCartItem(product: Product, quantity: number) {
        return {
            productId: product.productId,
            price: product.price,
            title: product.title,
            imagePath: product.imagePath,
            quantity: quantity
        };
    }

    // deletes guest from server
    deleteGuest(guestId: string) {
        let cartUrl = `http://localhost:3000/guest/${guestId}`
        this.http.delete(cartUrl)
            .subscribe(response => {
                localStorage.removeItem('cart');
            });
    }
}