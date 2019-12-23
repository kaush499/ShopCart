import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/cart/cart.model';
import { CartItem } from '../../shared/models/cart/cart-item.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentMethodModel } from '../models/payment-methods.model';
import { Address } from 'src/app/shared/models/address.model';

@Injectable({providedIn: "root"})
export class CheckOutService {
    private cart: Cart;
    private shippingAddress: Address;
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

    setShippingAddress(address: Address, userId: number) {
        this.shippingAddress = address;
        this.userId = userId
    }

    setPayment(payment: PaymentMethodModel){
        const order = this.buildOrder(payment.methodId);
        this.http.post(`http://localhost:3000/payment/${payment.routeName}`, {order: order})
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
            shipping: this.shippingAddress,
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