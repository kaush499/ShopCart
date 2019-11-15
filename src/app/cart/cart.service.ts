// import { CartItem } from './cartItem.model';
// import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
    // imgLink: string = "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg"

    // private cartItems: CartItem[] = [];
    // private isCartEmpty: boolean = true;
    // private updatedCartItems = new Subject<CartItem[]>();
    // private updatedEmptyCartValue = new Subject<boolean>();
    
    // constructor() {}

    // getCartItems(){
    //     return [...this.cartItems];
    // }

    // getCartEmptyValue() {
    //     return this.isCartEmpty;
    // }

    // getUpdatedCartEmptyValue() {
    //     return this.updatedEmptyCartValue.asObservable();
    // }

    // getUpdatedPostListener() {
    //     return this.updatedCartItems.asObservable();
    // }

    // addItem(id: string, title: string, imageUrl: string, price: number){
    //     this.isCartEmpty = false;
    //     const newItem = new CartItem(id, title, imageUrl, price, 1);
    //     this.cartItems.push(newItem);
    // }

    // removeItem(index: number) {
    //     this.cartItems.splice(index, 1);
    //     this.updatedCartItems.next([...this.cartItems]);
    //     if(this.cartItems.length == 0){
    //         this.isCartEmpty = true;
    //         this.updatedEmptyCartValue.next(this.isCartEmpty);
    //     }
    // }
}