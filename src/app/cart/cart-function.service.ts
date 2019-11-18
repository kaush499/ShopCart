import { Product } from '../shared/product/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../shared/cart/cart-item.model';

@Injectable({ providedIn: "root" })
export class CartFunction {

    constructor(private http: HttpClient) {}

    storeCart(guestId: string) {
        const now = new Date();
        const cartExpiration = new Date(now.getTime() + 3*24*3600*1000);
        let cart = {
            guestId: guestId,
            cartExpiration: cartExpiration
        };
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
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

    async createGuest() { 
        return this.http.get<{ guestId: number }>('http://localhost:3000/guest')
    }

    formNewCartItem(product: Product, quantity: number) {
        return {
            productId: product.productId,
            price: product.price,
            title: product.title,
            imagePath: product.imagePath,
            quantity: quantity
        };
    }

    async addGuestToUser(items: CartItem[], userId: number) {
        let cartUrl = `http://localhost:3000/user-cart/${userId}`
        for(let i = 0; i < items.length; i++) {
            let response = await this.http.post(cartUrl, {item: items[i]}).toPromise();
        }
    }

    deleteGuest(guestId: string) {
        let cartUrl = `http://localhost:3000/guest/${guestId}`
        this.http.delete(cartUrl)
            .subscribe(response => {
                localStorage.removeItem('cart');
            });
    }
}