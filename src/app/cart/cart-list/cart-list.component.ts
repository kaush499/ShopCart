import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../cartItem.model';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  cartItemList: CartItem[];
  private itemsSub: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() { 
    this.cartItemList = this.cartService.getCartItems();
    this.itemsSub = this.cartService.getUpdatedPostListener()
      .subscribe((items: CartItem[]) => {
        this.cartItemList = items;
      })
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
