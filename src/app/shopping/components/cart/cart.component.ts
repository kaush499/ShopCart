import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../../shared/models/cart/cart.model';
import { Router} from '@angular/router';
import { CheckOutService } from '../../../check-out/services/check-out.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;

  constructor(private cartService: CartService,
              private checkOutService: CheckOutService,
              private router: Router) { }

  // sets the cart
  async ngOnInit() {
    this.cart = await this.cartService.getCart();
  
  }

  proceedToCheckOut() {
    this.checkOutService.setCheckOutCart([...this.cart.items]);
    this.router.navigate(['check-out']);
  }

  ngOnDestroy() {
    
  }

}