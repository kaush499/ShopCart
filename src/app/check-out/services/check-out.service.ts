import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/cart/cart.model';
import { CartItem } from '../../shared/models/cart/cart-item.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentMethodModel } from '../models/payment-methods.model';

@Injectable({providedIn: "root"})
export class CheckOutService {
    private cart: Cart;
    private shippingAddressId: number;
    private userId: number;

    constructor(private router: Router,
                private http: HttpClient) {}

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

    setPayment(payment: PaymentMethodModel){
        const order = this.buildOrder(payment.methodId);
        this.http.post(`http://localhost:3000/payment/${payment}`, {order: order})
            .toPromise();
    }

    private buildOrder(methodId: number) {
        const items =  this.cart.items.map(item => {
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            };
        });

        const order = {
            items: items,
            userId: this.userId,
            totalAmount: this.cart.totalPrice,
            shipping: this.shippingAddressId,
            paymentId: methodId
        };

        return order;
    }

    getPaymentMethods() {
        return this.http
                .get<{methods: PaymentMethodModel[]}>
                ("http://localhost:3000/payment/methods");
    }
}