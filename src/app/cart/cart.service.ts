import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Cart } from '../shared/cart/cart.model';
import { map } from 'rxjs/operators';
import { CartItem } from '../shared/cart/cart-item.model';
import { Product } from '../shared/product/product.model';
import { CartFunction } from './cart-function.service';
import { promise } from 'protractor';

@Injectable({ providedIn: "root" })
export class CartService {
    private isAuthenticated: boolean = false;
    private cartId: string;
    private cart: Cart

    constructor(private userService: UserService,
                private http: HttpClient,
                private cartFunction: CartFunction) {}

    
    async getCart(): Promise<Cart> {
        if(this.cart){
            console.log("1122");
            return this.cart;
        } 
        console.log("1144");
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

    async setUser(userId: number): Promise<boolean>  {
        this.isAuthenticated = true;
        const guestId = this.cartId;
        this.cartId = userId.toString();
        if(this.cart){ 
            let cartItems = this.cart.items.map(item => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    userId: userId
                };
            });
            this.cart.items = [];
            this.cart = null;

            this.cartFunction.deleteGuest(guestId);

            this.http
            .post("http://localhost:3000/user-cart/addBunch",{items: cartItems})
            .subscribe(response => { 
                return true;
            });
            
        } else return true;
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