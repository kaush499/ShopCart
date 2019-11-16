import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: "root" })
export class CartService {
    isAuthenticated: boolean = false;
    cartId: string;

    constructor(private userService: UserService,
                private http: HttpClient) {}

    // setUser() {
    //     this.isAuthenticated = true;
    //     this.id
    // } 
    
    async getCart(): Promise<Observable<ShoppingCart>> {
        this.cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId)
          .map(x => new ShoppingCart(x.items));
    }
    
    private async getOrCreateCartId(): Promise<string> { 
        if(!this.isAuthenticated) {
            let cartId = localStorage.getItem('cartId');
            if (cartId) return cartId;

            (await this.create()).toPromise().then(result => {
                localStorage.setItem('cartId', result.guestId.toString());
                return result.guestId.toString();
            });
        } else{
            let userId = this.userService.getUserId();
            return  userId.toString();
        }   
    }

    private async create() { 
        return this.http.get<{ guestId: number }>('http://localhost:3000/guest');
    }
}