import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Cart } from '../shared/cart/cart.model';
import { map } from 'rxjs/operators';
import { CartItem } from '../shared/cart/cart-item.model';
import { Product } from '../shared/product/product.model';
import { CartFunction } from './cart-function.service';

@Injectable({ providedIn: "root" })
export class CartService {
    private isAuthenticated: boolean = false;
    private cartId: string;
    private cart: Cart

    constructor(private userService: UserService,
                private http: HttpClient,
                private cartFunction: CartFunction) {}

    
    async getCart(): Promise<Cart> {
        if(this.cart) return this.cart;

        this.cartId = await this.getOrCreateCartId();
        let cartUrl = this.getCartUrl();

        return this.http.get<{ items: CartItem[] }>(cartUrl)
                .pipe(
                    map(x => new Cart(x.items))
                ).toPromise().then(cart => {
                    this.cart = cart;
                    return this.cart
                });
    }

    async setUser(userId: number) {
        this.isAuthenticated = true;
        const guestId = this.cartId;
        this.cartId = userId.toString();
        if(this.cart){
            this.http.get<{ items: CartItem[] }>(`http://localhost:3000/user-cart/${userId}`)
            .subscribe(async response => {
                let newCart = response.items;
                let itemsToAdd = [];
                this.cart.items.forEach(item => {
                    let newItem = newCart.find(x => item.productId === x.productId);
                    if(!newItem) {
                        itemsToAdd.push(item);
                        newCart.push(item);
                    }
                });
                
        
                this.cart.items = [];
                // let cartUrl = `http://localhost:3000/user-cart/${userId}`
                // for(let i = 0; i < itemsToAdd.length; i++) {
                //     let resp = await this.http.post(cartUrl, {item: itemsToAdd[i]}).toPromise();
                // }
                newCart.forEach(item => {
                    this.cart.items.push(new CartItem(item));
                });
                this.cartFunction.addGuestToUser(itemsToAdd, userId);
                
            });
            if(guestId) this.cartFunction.deleteGuest(guestId);
            return true;
        }
        
    }

    removeUser() {
        this.isAuthenticated = false;
        this.cart.items = [];
        this.cart = null;
        this.cartId = null;
    }
    
    private async getOrCreateCartId(): Promise<string> { 
        if(!this.isAuthenticated) {
            let cartId = await this.cartFunction.retrieveCart();
            if (cartId) return cartId;

            (await this.cartFunction.createGuest()).toPromise().then(result => {
                this.cartId = result.guestId.toString();
                this.cartFunction.storeCart(this.cartId);
                return this.cartId;
            });
        } else{
            let userId = this.userService.getUserId();
            return userId.toString();
        }   
    }

    addNewProduct(product: Product) {
        let cartUrl = this.getCartUrl();
        console.log(cartUrl);
        this.http
        .post(cartUrl, {productId: product.productId})
        .subscribe(response => {
            let newCartItem = this.cartFunction.formNewCartItem(product, 1);
            this.cart.items.push(new CartItem(newCartItem));
        });
    }

    updateQuantity(productId: number, flag: number){
        let item = this.cart.items.find(x => x.productId == productId);
        const quantity = item.quantity + flag;
        let cartUrl = this.getCartUrl() + `/${productId}`;
        this.http.put(cartUrl, {quantity: quantity})
            .subscribe(response => {
                let cartItem = this.cart.items.find(x => x.productId == productId);
                cartItem.quantity = quantity;
            })
    }

    removeCartItem(productId: number) {
        let cartUrl = this.getCartUrl() + `/${productId}`;
        console.log(cartUrl);
        this.http.delete(cartUrl)
        .subscribe(response => {
            let deletedCartItemIndex = this.cart.items.findIndex(x => x.productId == productId);
            this.cart.items.splice(deletedCartItemIndex, 1);
        });
    }

    private getCartUrl() {
        let cartUrl = "http://localhost:3000/";
        if(this.isAuthenticated) return cartUrl + `user-cart/${this.cartId}`;
        else return cartUrl + `guest-cart/${this.cartId}`;
    }

}