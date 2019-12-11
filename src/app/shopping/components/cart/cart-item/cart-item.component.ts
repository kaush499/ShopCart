import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input('cartItem') item: CartItem;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  removeItem() {
    this.cartService.removeCartItem(this.item.productId);
  }

  increaseQuantity() {
    this.cartService.updateQuantity(this.item.productId, 1);
  }

  decreaseQuantity() {
    this.cartService.updateQuantity(this.item.productId, -1);
  }

}
