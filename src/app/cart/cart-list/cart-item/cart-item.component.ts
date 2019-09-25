import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../../cartItem.model';
import { CartService } from '../../cart.service';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input("cartItem") item: CartItem;
  @Input() index: number;

  constructor(private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit() {
  }

  onAddQuantity() {
    this.item.quantity++;
  }

  onSubtractQuantity() {
    if(this.item.quantity == 1){
      this.onRemove();
    }else{
      this.item.quantity--;
    }
  }

  onRemove() {
    this.cartService.removeItem(this.index);
    this.productService.removeFromCart(this.item.id);
  }

}
