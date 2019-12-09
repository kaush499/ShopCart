import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../shared/cart/cart.model';
import { Router} from '@angular/router';
import { CheckOutService } from '../check-out/check-out.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;

  constructor(private cartService: CartService) { }

  // sets the cart
  async ngOnInit() {
    this.cart = await this.cartService.getCart();
  
  }

  ngOnDestroy() {
    
  }

}