import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Cart } from '../shared/cart/cart.model';
import { map } from 'rxjs/operators';
import { CartItem } from '../shared/cart/cart-item.model';
import { Product } from '../shared/product/product.model';

@Injectable({ providedIn: "root" })
export class CartService {
    private isAuthenticated: boolean = false;
    private cartId: string;
    private cart: Cart

    constructor(private userService: UserService,
                private http: HttpClient) {}

    
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
    
    private async getOrCreateCartId(): Promise<string> { 
        if(!this.isAuthenticated) {
            let cartId = await this.retrieveCart();
            if (cartId) return cartId;

            (await this.create()).toPromise().then(result => {
                this.cartId = result.guestId.toString();
                this.storeCart(this.cartId);
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
            let newCartItem = this.formNewCartItem(product, 1);
            this.cart.items.push(new CartItem(newCartItem));
        });
    }

    private async create() { 
        return this.http.get<{ guestId: number }>('http://localhost:3000/guest')
    }

    private storeCart(guestId: string) {
        const now = new Date();
        const cartExpiration = new Date(now.getTime() + 3*24*3600*1000);
        let cart = {
            guestId: guestId,
            cartExpiration: cartExpiration
        };
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    private async retrieveCart() {
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

    private getCartUrl() {
        let cartUrl = "http://localhost:3000/";
        if(this.isAuthenticated) return cartUrl + `user-cart/${this.cartId}`;
        else return cartUrl + `guest-cart/${this.cartId}`;
    }

    private formNewCartItem(product: Product, quantity: number) {
        return {
            productId: product.productId,
            price: product.price,
            title: product.title,
            imagePath: product.imagePath,
            quantity: quantity
        };
    }
}